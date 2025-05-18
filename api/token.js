const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const [id, secret] = process.env.GHOST_ADMIN_API_KEY.split(':');
  if (!id || !secret) {
    return res.status(500).json({ error: "Invalid GHOST_ADMIN_API_KEY format" });
  }

  const token = jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 5 * 60,
      aud: "/v3/admin/"
    },
    Buffer.from(secret, 'hex'),
    {
      header: {
        alg: 'HS256',
        kid: id
      }
    }
  );

  res.status(200).json({ token });
};
