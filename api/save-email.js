module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!sheetUrl) {
    return res.status(500).json({ error: 'Sheet webhook not configured' });
  }

  try {
    const { email, plantType, source, timestamp } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send to Google Sheets via Apps Script web app
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        plantType: plantType || '',
        source: source || 'plant_quiz',
        timestamp: timestamp || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: 'Failed to save email',
        details: text,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
};
