import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "invalid token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY);
};

export { jwtAuthMiddleware, generateToken };