const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    name: String,
    email: String,
    role: String,
});

const User = mongoose.model("User", userScheme);

module.exports = User;
