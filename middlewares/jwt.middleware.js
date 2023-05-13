const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// JWT secret key
const secretKey = process.env.JWT_SECRET;

// Generate a new JWT token with a one hour expiration time
function generateToken(username, expiresIn) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiration = Math.floor(Date.now() / 1000) + expiresIn;
  return jwt.sign(
    { name: username, iat: issuedAt, exp: expiration },
    secretKey
  );
}

// JWT secret token authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        }
        return res.sendStatus(403);
      }

      next();
    });
  } else {
    res.sendStatus(401).send("Check Authorization header");
  }
};

module.exports = {
  generateToken,
  authenticateJWT,
};
