exports.handler = async function(event) {
  const params = new URLSearchParams(event.queryStringParameters || {});
  const apiKey = event.headers['x-api-key'] || '57122b72573ab1b98b90e9be20ca3bf5';
  const path = params.get('path') || 'fixtures';
  params.delete('path');
  const url = 'https://v3.football.api-sports.io/' + path + '?' + params.toString();
  try {
    const r = await fetch(url, { headers: { 'x-apisports-key': apiKey } });
    const data = await r.json();
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
