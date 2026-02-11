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
    // Silently fail if not configured - don't break the quiz
    return res.status(200).json({ success: true, note: 'Sheet not configured' });
  }

  try {
    const { plantType, plantCore, habitat, season, vitality, timestamp } = req.body;

    // Send to Google Sheets via Apps Script web app
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plantType: plantType || '',
        plantCore: plantCore || '',
        habitat: habitat || '',
        season: season || '',
        vitality: vitality || '',
        timestamp: timestamp || new Date().toISOString(),
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    // Silently fail - don't break the quiz experience
    return res.status(200).json({ success: true, note: 'Error logged' });
  }
};
