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

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { email, pdfBase64, plantName } = req.body;

    if (!email || !pdfBase64) {
      return res.status(400).json({ error: 'Email and PDF are required' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Plant Wellness Quiz <onboarding@resend.dev>',
        to: email,
        subject: `Your Plant Wellness Results: You're a ${plantName}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #2a2a2a; font-size: 24px; margin-bottom: 16px;">Your Plant Wellness Results</h1>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for taking the Plant Wellness Quiz! Based on your responses, you're a <strong>${plantName}</strong>.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Your full results are attached as a PDF. This includes your plant type, habitat, seasonal growth patterns, and vitality report.
            </p>
            <p style="color: #888; font-size: 14px; line-height: 1.6;">
              Wherever you are right now is a valid place to be. Growth isn't always visible, and rest is part of the cycle.
            </p>
          </div>
        `,
        attachments: [
          {
            filename: `plant-wellness-results-${plantName.toLowerCase()}.pdf`,
            content: pdfBase64,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to send email',
        details: data.message || data.error || JSON.stringify(data)
      });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};
