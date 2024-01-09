const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming token is sent in the authorization header

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  // Verify and decode the token
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next(); // Pass the decoded token payload to the next middleware
  });
};

module.exports = verifyToken;
