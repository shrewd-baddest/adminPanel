import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY is missing in .env");
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];
 

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
     req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default verifyToken;
