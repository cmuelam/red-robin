exports.handler = async function(event) {
  const params = new URLSearchParams(event.queryStringParameters || {});
  const apiKey = params.get('key') || '7ff55fee23b1bad75b35954f32bd303b';
  const city = params.get('city') || 'Mexico City';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) + '&appid=' + apiKey + '&lang=es';
  try {
    const r = await fetch(url);
    const data = await r.json();
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
