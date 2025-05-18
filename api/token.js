import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5分钟有效
      aud: "/v3/admin/",
    },
    process.env.GHOST_ADMIN_API_SECRET,
    {
      algorithm: "HS256",
      keyid: process.env.GHOST_ADMIN_API_KEY_ID,
    }
  );

  res.status(200).json({ token: `Ghost ${token}` });
}
