const mongoose = require("mongoose");

const ticketScheme = mongoose.Schema({
    show: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Show",
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
});

const Ticket = mongoose.model("Ticket", ticketScheme);

module.exports = Ticket;
