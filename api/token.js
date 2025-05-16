import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing ADMIN_API_KEY environment variable' });
  }

  const [id, secret] = apiKey.split(':');

  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 5 * 60,
    aud: '/ghost/',
  };

  try {
    const token = jwt.sign(payload, Buffer.from(secret, 'hex'), {
      algorithm: 'HS256',
      keyid: id,
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'JWT generation failed', details: err.message });
  }
}
