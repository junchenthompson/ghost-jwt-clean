import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 5 * 60, // 5分钟后过期
  };

  const secret = 'mysecret'; // 测试用，你可以替换成 Ghost Admin Secret

  try {
    const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({
      error: 'JWT generation failed',
      details: err.message,
    });
  }
}
