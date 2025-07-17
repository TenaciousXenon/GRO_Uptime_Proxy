/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


addEventListener("fetch", event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get("url")
  if (!target) {
    return new Response("⚠️ Missing `?url=` parameter", { status: 400 })
  }

  try {
    const resp = await fetch(target, {
      headers: {
        // Real Chrome UA on macOS
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
                      "AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/118.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow"
    })

    const body = await resp.arrayBuffer()
    return new Response(body, {
      status: resp.status,
      headers: resp.headers
    })
  } catch (err) {
    return new Response(`🚨 Error fetching ${target}: ${err}`, { status: 502 })
  }
}
