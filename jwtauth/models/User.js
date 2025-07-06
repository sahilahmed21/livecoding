const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }, // optional: store current refresh token
});

module.exports = mongoose.model("User", userSchema);
