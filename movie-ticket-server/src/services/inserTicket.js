const Ticket = require("../models/ticket");

async function insertTicket(data) {
    let ticket = {
        show: data.show,
        user: data.user,
    };

    if (data._id) {
        try {
            const response = await Ticket.updateOne({ _id: data._id }, ticket, {
                upsert: true,
            });
            console.log("Ticket updated successfully");
            console.log(response);
            return response;
        } catch (err) {
            console.log("Error updating ticket", err);
        }
    } else {
        try {
            const newTicket = new Ticket(ticket);
            const response = await newTicket.save();
            console.log("Ticket saved successfully");
            console.log(response);
            return response;
        } catch (err) {
            console.log("Error saving ticket", err);
        }
    }
}

module.exports = insertTicket;
