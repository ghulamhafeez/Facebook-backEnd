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
});

module.exports = mongoose.model("Facebook", facebookSchema);