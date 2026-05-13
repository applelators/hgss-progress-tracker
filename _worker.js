// Cloudflare Worker with static assets
// Handles /state relay for OBS overlay cross-browser sync.
// All other requests pass through to static assets.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/state') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: CORS });
      }
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          await env.TRACKER_KV.put('state', JSON.stringify(body));
          return new Response(JSON.stringify({ ok: true }), {
            headers: { ...CORS, 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
          });
        }
      }
      if (request.method === 'GET') {
        const state = await env.TRACKER_KV.get('state');
        return new Response(state ?? 'null', {
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      }
    }

    // Pass everything else through to static assets
    return env.ASSETS.fetch(request);
  },
};
