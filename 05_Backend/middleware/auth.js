const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    const extractedToken = token.replace("Bearer ","")
    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        // Handle unauthorized error
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      }
  
      req.decoded = decoded;
      next();
    });
  };


module.exports = { verifyToken };