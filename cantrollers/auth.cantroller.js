const User = require("../model/user.model");
const jwtToken = require("../utils/jwtToken");
const {
  encryptPassword,
  validatePassword,
} = require("../utils/encryptPassword");


// @desc    Signin
// @route   POST api/signin
// @access  Public
exports.signIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill all the details" });
    }

    const isUser = await User.exists({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const encryptedPassword = await encryptPassword(password);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token = jwtToken({ _id: user._id });

    res.json({
      staus: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// @desc    Login
// @route   POST api/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill all the details" });
    }

    const isUser = await User.exists({ email });
    if (!isUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email does not exists" });
    }

    const user = await User.find({ email });
    const token = jwtToken({ _id: user._id });
    const isPasswordValidated = await validatePassword(
      password,
      user[0].password
    );

    if (!isPasswordValidated) {
      return res.json({ status: false, message: "Invalid email or password" });
    }

    res.json({
      status: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
