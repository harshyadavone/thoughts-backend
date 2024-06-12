import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.cookies.access_token;

  if (!token)
    return res.status(401).json({ message: "You are not authenticated" });
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });
    req.user = user;
    next();
  });
};
