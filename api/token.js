import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const [id, secret] = process.env.GHOST_ADMIN_API_KEY.split(':');

  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 5 * 60, // 5 分钟
    aud: "/v3/admin/"
  };

  const token = jwt.sign(payload, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256'
  });

  res.status(200).json({ token });
}
