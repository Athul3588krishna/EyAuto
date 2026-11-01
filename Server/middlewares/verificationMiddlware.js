import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "eyauto_default_secret_key");
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default verifyToken;
