const jwt = require("jsonwebtoken");
const CustomErrorApi = require("../error/error");
require("dotenv").config();

const generateAuthToken = (user) => {
  const { id, email } = user;

  var access_token = jwt.sign({ id, email }, process.env.access_key, {
    expiresIn: "2d",
  });

  var refresh_token = jwt.sign({ id, email }, process.env.refresh_key, {
    expiresIn: "7d",
  });

  return {
    access_token: access_token,
    refresh_token: refresh_token,
  };
};

const verify = (token) => {
  const decode = jwt.verify(token, process.env.access_key);
  if (!decode) {
    throw new CustomErrorApi("Login again ", 400);
  }
  return decode;
};
module.exports = { generateAuthToken, verify };
