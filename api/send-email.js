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
    const { email, plantName, plantIcon, plantCore, plantDescription, habitatName, habitatIcon, reflection, habits, overallVitality } = req.body;

    if (!email || !plantName) {
      return res.status(400).json({ error: 'Email and plant name are required' });
    }

    const habitsHtml = habits ? habits.map(h => `<li style="margin-bottom: 8px; color: #555;">${h}</li>`).join('') : '';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Plant Wellness Quiz <onboarding@resend.dev>',
        to: email,
        subject: `${plantIcon} You're a ${plantName}! - Your Plant Wellness Results`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f7f5f0;">
            <div style="background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="font-size: 48px;">${plantIcon}</span>
                <h1 style="color: #2a2a2a; font-size: 28px; margin: 16px 0 8px;">You're a ${plantName}!</h1>
                <p style="color: #6b8f71; font-size: 16px; margin: 0;">${plantCore}</p>
              </div>

              <p style="color: #555; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
                ${plantDescription}
              </p>

              <div style="background: #f7f5f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="color: #6b8f71; font-size: 14px; font-weight: 600; margin: 0 0 8px;">Reflect on this</p>
                <p style="color: #555; font-size: 15px; font-style: italic; margin: 0; line-height: 1.6;">"${reflection}"</p>
              </div>

              ${habits ? `
              <div style="margin-bottom: 24px;">
                <p style="color: #6b8f71; font-size: 14px; font-weight: 600; margin: 0 0 12px;">Habits to try</p>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.7;">
                  ${habitsHtml}
                </ul>
              </div>
              ` : ''}

              <div style="border-top: 1px solid #eee; padding-top: 20px;">
                <p style="color: #888; font-size: 14px; margin: 0;">
                  <strong>Your Habitat:</strong> ${habitatIcon} ${habitatName}<br>
                  <strong>Overall Vitality:</strong> ${overallVitality}%
                </p>
              </div>
            </div>

            <p style="color: #888; font-size: 14px; text-align: center; line-height: 1.6;">
              Wherever you are right now is a valid place to be.<br>
              Growth isn't always visible, and rest is part of the cycle.
            </p>
          </div>
        `,
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
