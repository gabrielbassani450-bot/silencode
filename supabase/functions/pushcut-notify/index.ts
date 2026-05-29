const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const [res1, res2] = await Promise.all([
      fetch("https://api.pushcut.io/qKxHEj6vG6yJoLUuHT5wR/notifications/Silencode%20%20", { method: "POST" }),
      fetch("https://api.pushcut.io/TSjRoHkFsPiA4nkvy4Z5A/notifications/Silencode%20%F0%9F%90%90%20", { method: "POST" }),
    ]);
    const [text1, text2] = await Promise.all([res1.text(), res2.text()]);
    return new Response(JSON.stringify({
      webhook1: { ok: res1.ok, status: res1.status, body: text1 },
      webhook2: { ok: res2.ok, status: res2.status, body: text2 },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
