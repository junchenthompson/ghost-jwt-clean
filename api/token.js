const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const payload = {
    iat: Math.floor(Date.now() / 1000),                // 当前时间
    exp: Math.floor(Date.now() / 1000) + 60 * 10,      // 有效期 10 分钟
    aud: "/v3/admin/",
  };

  const token = jwt.sign(payload, process.env.GHOST_ADMIN_API_KEY, {
    keyid: process.env.GHOST_ADMIN_API_KEY.split(":")[0],
    algorithm: "HS256",
  });

  res.status(200).json({ token });
};
