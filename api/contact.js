// Vercel Serverless Function: /api/contact
// Expects POST JSON: { name, email, message }
// Uses SendGrid Web API. Configure these environment variables in Vercel:
// SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM = process.env.SENDGRID_FROM_EMAIL;
    const TO = process.env.SENDGRID_TO_EMAIL;

    if (!SENDGRID_API_KEY || !FROM || !TO) {
      res.status(500).json({ error: 'Email sending not configured. Please set SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, and SENDGRID_TO_EMAIL.' });
      return;
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: TO }],
          subject: `Portfolio contact from ${name}`
        }
      ],
      from: { email: FROM },
      content: [
        {
          type: 'text/plain',
          value: `You have a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        }
      ]
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      res.status(200).json({ ok: true });
    } else {
      const text = await response.text();
      console.error('SendGrid error:', response.status, text);
      res.status(502).json({ error: 'Failed to send email', details: text });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
