const mongoose = require("mongoose");

const facebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  // userName: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
});
module.exports = mongoose.model("Facebook", facebookSchema ,);

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: false,
  // },
  // file: {
  //   type: String,
  //   required: false,
  // },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);