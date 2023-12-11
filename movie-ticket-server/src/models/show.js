const mongoose = require("mongoose");

const showScheme = mongoose.Schema({
    id: { type: Number, required: true },
    date: { type: String, required: true },
    seat: { type: Number, required: true },
    price: { type: Number, required: true },
});

const Show = mongoose.model("Show", showScheme);

module.exports = Show;
