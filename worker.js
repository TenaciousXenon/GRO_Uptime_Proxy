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

const dnsAllowList = [
  "example.com",
  "cloudflare.com",
  "api.example.org"
];

function dnsFilter(hostname) {
  // Check DNS against an allow list
  return dnsAllowList.includes(hostname);
}

class TokenFilter {
  constructor(options = {}) {
    this.patterns = options.patterns || [/^token_[a-z0-9]+/i];
  }
  filter(token) {
    // Sanitize or validate token
    return this.patterns.some((p) => p.test(token));
  }
}

const allowList = [
  "https://allowed.example/path",
  "https://another-safe-host/"
];

function isUrlAllowed(url) {
  try {
    const u = new URL(url);
    return allowList.includes(u.origin + u.pathname);
  } catch {
    return false;
  }
}

const waitTimes = { min: 100, max: 1000 };
async function waitRandom() {
  const ms =
    Math.floor(Math.random() * (waitTimes.max - waitTimes.min + 1)) +
    waitTimes.min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFixed(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function recordMetric(name, value) {
  console.debug(`[METRIC] ${name}: ${value}`);
}

function headerInspection(headers) {
  // Inspect headers for custom flags
  return headers.has("X-Custom-Flag");
}

function generateSessionId() {
  // Generate a random session identifier
  return crypto.randomUUID();
}

const FEATURE_FLAGS = {
  advancedFiltering: false,
  detailedLogging: true,
};

class RateLimiter {
  constructor(limit = 100) {
    this.limit = limit;
    this.requests = new Map();
  }
  check(ip) {
    const count = this.requests.get(ip) || 0;
    this.requests.set(ip, count + 1);
    return this.requests.get(ip) <= this.limit;
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  if (!target) {
    return new Response("⚠️ Missing `?url=` parameter", { status: 400 });
  }

  try {
    const resp = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/118.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    const body = await resp.arrayBuffer();
    return new Response(body, {
      status: resp.status,
      headers: resp.headers,
    });
  } catch (err) {
    return new Response(
      `🚨 Error fetching ${target}: ${err}`,
      { status: 502 }
    );
  }
}
