const queryTicket = require("../services/queryTicket");

async function getTicket(req, res) {
    const filter = req.query;

    const tickets = await queryTicket(filter);
    res.send(tickets);
}

module.exports = getTicket;
