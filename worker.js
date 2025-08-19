/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Configuration and utility modules

/**
 * Simple GET/POST proxy Worker
 *  - GET  /?url=<encoded-target>
 *  - POST {"url":"<target>"} as JSON
 * For each request, does a full GET of the target site
 * and returns status, headers, and body (binary-safe).
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let target

  // 1) Extract target URL from GET or POST
  if (request.method === 'GET') {
    target = new URL(request.url).searchParams.get('url')
  } else if (request.method === 'POST') {
    const ct = request.headers.get('Content-Type') || ''
    if (ct.includes('application/json')) {
      try {
        const { url } = await request.json()
        target = url
      } catch {
        return new Response('Invalid JSON body', { status: 400 })
      }
    } else {
      return new Response('Unsupported Content-Type', { status: 415 })
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 })
  }

  if (!target) {
    return new Response('Missing "url" parameter', { status: 400 })
  }

  // 2) Validate URL
  let fetchUrl
  try {
    fetchUrl = new URL(target).toString()
  } catch {
    return new Response('Invalid URL', { status: 400 })
  }

  // 3) Perform fetch
  let upstreamResponse
  try {
    upstreamResponse = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CF-Worker)',
        'Accept': '*/*'
      },
      redirect: 'follow'
    })
  } catch (err) {
    return new Response(`Error fetching target: ${err.message}`, { status: 502 })
  }

  // 4) Capture status and headers early
  const upstreamStatus  = upstreamResponse.status
  const upstreamHeaders = new Headers(upstreamResponse.headers)

  // 5) Read body as ArrayBuffer (binary-safe)
  let bodyBuffer
  try {
    bodyBuffer = await upstreamResponse.arrayBuffer()
  } catch {
    return new Response('Error reading upstream response', { status: 502 })
  }

  // 6) Add CORS/debug headers
  upstreamHeaders.set('Access-Control-Allow-Origin', '*')
  upstreamHeaders.set('X-Proxy-Worker', 'cloudflare')
  upstreamHeaders.set('X-Upstream-Status', String(upstreamStatus))

  // 7) Return proxied response
  return new Response(bodyBuffer, {
    status: upstreamStatus,
    headers: upstreamHeaders
  })
}
