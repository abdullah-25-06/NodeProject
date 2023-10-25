const mongoose = require("mongoose");
const CustomErrorApi = require("../error/error");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    token:{
      type:String
    },
    avatar:{
      type:Buffer
    }
  },
  {
    timestamps: true,
  }
);
UserSchema.static.findByEmail = async (email) => {
  user = await User.find({ email });
  if (!user) {
    throw new CustomErrorApi("User Doesn't Exists");
  }
  const isValid = bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Wrong password");
  }
  return user;
};
module.exports = mongoose.model("User", UserSchema);
