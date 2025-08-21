# UptimeRobot Runbook (Non‑Technical)

This guide walks you through how to add and delete monitors in UptimeRobot and how to troubleshoot when a monitor shows a site as “down.” 


## Quick Definitions

- Normal link (Direct URL): The regular website address, for example: https://example.com/
- Proxy link: A special link we can use when direct checks don’t work: https://uptime-proxy.gro-marketing.workers.dev/?url= + your website URL. Example:
  https://uptime-proxy.gro-marketing.workers.dev/?url=https://example.com/
- GTM ID: The Google Tag Manager container ID found on the site. It looks like GTM-XXXXXXX.
- “Churned” site: A site that is no longer our client or is intentionally taken down/replaced.


## Important Note About Monitor Updates

Whenever you change a monitor (URL, keyword, method, etc.), pause it and then resume it. This helps UptimeRobot pick up your changes faster.

Steps:
1) Open the monitor in UptimeRobot
2) Toggle Pause
3) Wait ~5–10 seconds
4) Toggle Resume


## Adding a Monitor

Use this when you want UptimeRobot to start watching a website.

1) Log in to UptimeRobot
2) Click “New Monitor”
3) Choose a Monitor Type:
   - HTTP(s): Good for basic uptime checks (is the site responding?)
   - Keyword: Good for verifying a specific text exists on the page (we often use the GTM ID)
4) Fill out the fields:
   - Friendly Name: A clear label (e.g., “GTM-XXXXXXX – Company”)
   - URL:
     - Start with the normal link (e.g., https://example.com/)
     - If it immediately reports “down” after you save, switch to the proxy link:
       https://uptime-proxy.gro-marketing.workers.dev/?url=https://example.com/
   - For Keyword monitors only:
     - Keyword: Use a text that should be present on the page (often the GTM ID like GTM-XXXXXXX)
     - Condition: “Alert when keyword Not Exists” (so it alerts when the keyword is missing)
5) Advanced Options:
   - Request Method: Start with GET
   - If the proxy is very slow or results are inconsistent, try switching to POST (leave the request body empty unless instructed)
6) Alert Contacts: Select who should be notified (Ingrid Tayshuns- Email, GTM ISSUES- Slack)
7) Create/Saved
8) Immediately Pause and then Resume the monitor (see “Important Note About Monitor Updates” above)


## Deleting a Monitor

Use this if a site is retired/churned or you no longer need monitoring.

1) Find the monitor in UptimeRobot
2) Open the monitor’s settings/details
3) Click Delete (trash icon or “Delete Monitor”) (Personally I use the bulk action feature)
4) Confirm

Tip: If you aren’t 100% sure, you can Pause the monitor instead of deleting it.


## Fixing a “Down” Site (Troubleshooting Checklist)

Work through these steps in order. After each change, Pause and Resume the monitor to refresh results faster.

1) Refresh and Recheck
   - Open the normal link in your browser. If it loads fine for you, continue to step 2.
   - If it does NOT load and it’s a normal link (no proxy):
     - The site might truly be down or churned. Confirm with the team/client.

2) Try the Proxy Link
   - If the monitor goes down right after adding it, replace the URL in the monitor with the proxy link:
     https://uptime-proxy.gro-marketing.workers.dev/?url=https://example.com/
   - In Advanced Options, set Request Method to GET and Save.
   - Pause and Resume the monitor.
   - If the proxy takes a long time to load but the normal site is quick, try changing the Request Method to POST and Save, then Pause/Resume.

3) If the Monitor Says “Cannot find keyword”
   - This applies to Keyword monitors only.
   - Check the site for the GTM ID (see “How to check the GTM ID” below).
   - If the GTM ID is present on the page:
     - Verify the Keyword in the monitor exactly matches the site’s GTM ID (including dashes and capitalization).
     - Make sure the monitor’s Condition is “Alert when keyword Not Exists” if that’s how we intended to track it.
     - Consider checking a page where the GTM snippet definitely appears (usually the homepage).
   - If the GTM ID is not present:
     - The site might be churned or the GTM was removed/replaced. Confirm with the team/client.

4) Compare Normal vs Proxy Behavior
   - Normal link works, proxy is slow or fails:
     - Keep the normal link. Some sites don’t like being proxied.
   - Normal link fails, proxy works:
     - Keep the proxy link in UptimeRobot.
     - If results are inconsistent, try switching the Request Method (GET ↔ POST), then Pause/Resume.
   - Both fail:
     - The site might be down, blocking bots, or changed. Try again in a few hours and escalate if it persists.

5) Give It Time if You’ve Tried Everything
   - CDN caches, DNS changes, or site protections can cause temporary false alarms.
   - If you’ve checked all steps and it still shows down, wait a few hours, then recheck. If still down, escalate.


## How to Check the GTM ID on a Site

Option A: Quick search in page source
1) Open the site in your browser
2) Right‑click anywhere on the page and choose “View Page Source”
3) Press Ctrl/Cmd + F and search for GTM-
4) You should find something like GTM-XXXXXXX. That’s the GTM ID.

Option B: Using DevTools Network panel (Chrome/Edge/Firefox)
1) Open the site
2) Right‑click and choose “Inspect”
3) Go to the “Network” tab
4) In the filter box, type GTM
5) Click a matching network request
6) In the Headers, look for a URL or reference that includes GTM-XXXXXXX

If you cannot find any GTM-XXXXXXX in source or Network, the GTM snippet may have been removed or the site is churned/changed.


## Best Practices and Tips

- Always Pause/Resume after editing a monitor so changes apply quickly.
- Use a Keyword monitor only if you know a stable keyword exists on the page (GTM ID is common and usually reliable).
- If the site uses heavy scripting or dynamic content, UptimeRobot checks may not see content added after page load. Use a keyword that appears in the initial HTML (GTM ID usually does).
- If possible, monitor the simplest, most stable page (typically the homepage).
- Avoid copying extra spaces or trailing slashes incorrectly. The proxy link should look like:
  https://uptime-proxy.gro-marketing.workers.dev/?url=https://example.com/
- Keep the GTM container snippet on the site. Removing it will cause keyword‑based monitors (that look for the GTM ID) to fail.


## When to Escalate

- The normal link does not load for you and/or via the proxy for several hours
- The keyword should exist (e.g., GTM ID) but cannot be found even after re‑checking
- You suspect the site is blocking monitoring or requires special headers
- You believe the site is churned but need confirmation


## Quick Reference

- Proxy prefix:
  https://uptime-proxy.gro-marketing.workers.dev/?url=
  Example:
  https://uptime-proxy.gro-marketing.workers.dev/?url=https://example.com/

- Start with GET; if slow or inconsistent via proxy, try POST.

- Common monitor types we use:
  - HTTP(s): Basic uptime
  - Keyword: Verify keyword presence (e.g., GTM-XXXXXXX) and alert when missing

- Keep GTM tag on the site. Removing it breaks keyword monitors that rely on it.

Last updated: 2025-08-20
Contact and developer: Joey Burke (joeybvb10@gmail.com) (note this is personal email so may take some time for me to get back to you)

