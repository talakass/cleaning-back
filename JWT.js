const { sign, verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign({ id: user._id ,status: user.status }, process.env.JWT_SECRET_KEY);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User Not Authenticated!" });
  }
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET_KEY);
    if (validToken) {
      req.authenticated = true;
      req.user = user;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// GET TOKEN PAYLOAD
const getTokenPayload = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

const extractIdFromToken = (token) => {
  const payload = getTokenPayload(token);
  if (payload) {
    const { id , status } = payload;
    return { id , status };
  } else {
    return null;
  }
};

module.exports = {
  createTokens,
  validateToken,
  getTokenPayload,
  extractIdFromToken,
};
