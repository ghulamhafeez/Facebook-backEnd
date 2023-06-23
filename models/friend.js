const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Friend", friendSchema);
