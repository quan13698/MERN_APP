const jwt = require("jsonwebtoken");

const veryfiToken = (req, res, next) => {
  const authenHeader = req.header("Authorization");
  const token = authenHeader && authenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found, input your token!!" });
  }
  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = decoded.userId;
      next();
  } catch (error) {
      console.log(error);
      res.status(403).json({success: false, message: "Invalid token"})
  }
};
module.exports = {
    veryfiToken:veryfiToken
};
