const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    recent: {
        type: Date,
    },
    requests: {
        type: Number,
        default: 1,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
