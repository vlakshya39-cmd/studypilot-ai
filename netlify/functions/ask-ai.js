// StudyPilot AI — netlify/functions/ask-ai.js
//
// Securely proxies prompts to Google's Gemini API (free tier).
// The API key lives only here, as a server-side environment variable —
// never exposed to the browser.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON in request body' }) };
  }

  const prompt = (body.prompt || '').trim();
  if (!prompt) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing "prompt" in request body' }) };
  }
  if (prompt.length > 8000) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Prompt too long' }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Server is missing GEMINI_API_KEY configuration' }) };
  }

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (response.status === 429) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Rate limited — please try again in a moment.' }) };
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', response.status, errText);
      return { statusCode: 502, body: JSON.stringify({ error: 'AI service returned an error.' }) };
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      '';

    if (!text) {
      return { statusCode: 502, body: JSON.stringify({ error: 'AI service returned an empty response.' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    console.error('ask-ai function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Unexpected server error.' }) };
  }
};
