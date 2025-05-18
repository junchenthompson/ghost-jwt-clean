import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 600,
    aud: "/v3/admin/",
  };
  const token = jwt.sign(payload, process.env.GHOST_ADMIN_API_KEY, {
    keyid: process.env.GHOST_ADMIN_API_KEY.split(":")[0],
    algorithm: "HS256",
  });
  res.status(200).json({ token });
}
