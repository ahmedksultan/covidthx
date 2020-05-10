const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    ip: {
      type: String,
      required: true,
    },
    ipCount: {
      type: String,
      required: true,
    }
    expirationTime{
      type: Date,
      required: true,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
