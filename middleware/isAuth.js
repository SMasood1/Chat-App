const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Retrive JWT payload
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
    });
  }
};
