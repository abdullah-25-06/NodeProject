const CustomErrorApi = require("../error/error");
const { verify } = require("../utils/jwt");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");

const Auth = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decode = verify(token);
  const user = await User.findOne({ _id: decode.id, token: token }).select(
    "-password"
  );
  if (!user) {
    throw new CustomErrorApi("Login failed, Please login again", 401);
  }
  req.user = { id: user._id, name: user.name, email: user.email };
  next();
});

module.exports = Auth;
