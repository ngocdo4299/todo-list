const jwt = require('jsonwebtoken');
const jwtSecret = process.env.TOKEN_SECRET_KEY;
const tokenExpiryTime = process.env.TOKEN_EXPIRY_TIME;

exports.verify = (token) => {
  return jwt.verify(token, jwtSecret)
}

exports.sign = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiryTime })
}