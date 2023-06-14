const mongoose = require("mongoose");

const facebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Facebook", facebookSchema);