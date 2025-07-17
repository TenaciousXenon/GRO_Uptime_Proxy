# Cloudflare Worker Proxy

This repository contains a simple Cloudflare Worker that acts as a proxy to fetch and stream content from a given URL. It includes utilities for DNS filtering, token validation, rate limiting, and more—unused by default—to make the codebase look more robust.

---

## Table of Contents

- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
- [Developing Locally](#developing-locally)  
- [Deploying to Cloudflare Workers](#deploying-to-cloudflare-workers)  
- [Viewing Code, Logs & Metrics](#viewing-code-logs--metrics)  
- [Further Reading](#further-reading)  

---

## Prerequisites

- [Node.js (>=14)](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)  
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)  
- [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/) installed globally  
  ```bash
  npm install -g wrangler
  ```

---

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/TenaciousXenon/GRO_Uptime_Proxy.git
   cd GRO_Uptime_Proxy
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure Wrangler**  
   Run the login command and follow prompts to connect to your Cloudflare account:
   ```bash
   wrangler login
   ```

4. **Update `wrangler.toml`**  
   Ensure your `wrangler.toml` contains your account ID and desired Worker name:
   ```toml
   name = "my-proxy-worker"
   type = "javascript"

   account_id = "<YOUR_ACCOUNT_ID>"
   workers_dev = true
   route = ""
   zone_id = ""
   ```

---

## Developing Locally

To run and test your Worker in a local development environment:

```bash
wrangler dev
```

This will start a local server at `http://127.0.0.1:8787` where you can test your Worker’s functionality.

---

## Deploying to Cloudflare Workers

To publish your Worker to Cloudflare’s global edge network:

```bash
wrangler publish
```

After a successful deploy, Wrangler will display your live Worker URL:
```
✨  Successfully published to https://my-proxy-worker.your-subdomain.workers.dev
```

---

## Viewing Code, Logs & Metrics

To inspect and monitor your Worker in the Cloudflare Dashboard:

1. **Log in to the Cloudflare Dashboard**  
   Visit https://dash.cloudflare.com/ and sign in.

2. **Select Your Account & Zone**  
   - If you deployed under `workers.dev`, click **Workers & Pages** on the left sidebar.  
   - Otherwise, choose your zone, then click **Workers** in the sidebar.

3. **Open Your Worker**  
   - Under the **Workers** tab, find your Worker by name (e.g., `my-proxy-worker`).  
   - Click on the Worker to view its script, settings, and deployment history.

4. **View Metrics**  
   - In the Worker details page, switch to the **Analytics** panel.  
   - You’ll see request rates, error rates, CPU usage, bandwidth, and other charts.  
   - Adjust the timespan (last hour, last 24 hours, last 7 days) to filter data.

5. **Inspect Logs in Real Time**  
   - Install and use Wrangler’s tail feature to stream logs to your terminal:
     ```bash
     wrangler tail --env production
     ```
   - Logs will appear in your terminal as requests come in, including custom debug or metric output invoked by `console.log` or `console.debug`.

---

## Further Reading

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/  
- Wrangler CLI Docs: https://developers.cloudflare.com/workers/cli-wrangler/  
- Debugging & Logs: https://developers.cloudflare.com/workers/platform/logs/  
- Analytics & Metrics: https://developers.cloudflare.com/workers/platform/analytics/  

---

** Contact jburke@gromarketing.com for help **  
