exports.handler = async function(event) {
  const path = event.path.replace('/.netlify/functions/proxy/', '');
  const qs = event.rawQuery ? '?' + event.rawQuery : '';
  const apiKey = event.headers['x-apisports-key'] || event.headers['x-api-key'] || '';
  const isWeather = path.includes('openweathermap');
  const url = isWeather
    ? `https://api.openweathermap.org/${path}${qs}`
    : `https://v3.football.api-sports.io/${path}${qs}`;
  try {
    const headers = isWeather ? {} : { 'x-apisports-key': apiKey };
    const r = await fetch(url, { headers });
    const body = await r.text();
    return { statusCode: r.status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
