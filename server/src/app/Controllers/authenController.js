const argon2 = require("argon2");
const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const { use } = require("../../Routers/Router");
const register = async (req, res) => {
  //if missing email or password
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  try {
    // if input a existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already used" });
    // if possible to registert
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();
    //token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ success: true, message: "create successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
    //username found
    const passwornValid = await argon2.verify(user.password, password);
    if (!passwornValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ success: true, message: "Logged in succesfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status.json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  register: register,
  login: login,
};
