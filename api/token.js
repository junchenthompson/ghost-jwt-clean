export default function handler(req, res) {
  res.status(200).json({ succ// api/token.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const [id, secret] = '68261dae6ab8fa0001a116bb:305710084c895aa9f34bbd49361a7f8c1829033f95acd4e1dcecab766033efa3'.split(':');

  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 5 * 60,
    aud: `/admin/`,
  };

  const token = jwt.sign(payload, Buffer.from(secret, 'hex'), {
    header: { kid: id, alg: 'HS256' },
  });

  res.status(200).json({ token });
}
ess: true });
}
