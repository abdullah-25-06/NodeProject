const CustomErrorApi = require("../error/error");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateAuthToken } = require("../utils/jwt");

const Register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!email || !password || !name) {
    throw new CustomErrorApi(
      "Please Enter all name and email and password",
      400
    );
  }
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    throw new CustomErrorApi("User already exists with same email", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashPassword });

  const { access_token, refresh_token } = generateAuthToken(user);
  const token = await User.updateOne(
    { _id: user._id },
    { token: access_token }
  );
  if (!token) {
    throw new CustomErrorApi("Try again to register", 400);
  }
  return res.status(200).json({ user, access_token, refresh_token });
});
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { access_token, refresh_token } = generateAuthToken(user);

    const token = await User.findByIdAndUpdate(
      { _id: user._id },
      { token: access_token }
    );

    return res.status(200).json({ access_token, refresh_token });
  }
  throw new CustomErrorApi("Invalid email or password", 400);
});
const Logout = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(req.user)
  await User.findByIdAndUpdate({ _id: id },{token:null});
  res.status(200).send({message:'You have been logged out'})
});
module.exports = { Register, Login, Logout };
