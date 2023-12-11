const insertTicket = require("../services/inserTicket");

async function postTicket(req, res) {
    await insertTicket(req.body).then((response) => {
        return res.send(response);
    });
}

module.exports = postTicket;
