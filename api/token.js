import jwt from 'jsonwebtoken'; // trigger redeploy

export default function handler(req, res) {
  const adminApiKey = process.env.GHOST_ADMIN_API_KEY;

  if (!adminApiKey) {
    return res.status(500).json({ error: 'Missing GHOST_ADMIN_API_KEY' });
  }

  const [id, secret] = adminApiKey.split(':');

  try {
    const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
      keyid: id,
      algorithm: 'HS256',
      expiresIn: '5m',
      audience: '/v3/admin/',
    });

    return res.status(200).json({
      token: `Ghost ${token}`,
    });
  } catch (err) {
    console.error('Token generation error:', err);
    return res.status(500).json({ error: 'Token generation failed' });
  }
}
