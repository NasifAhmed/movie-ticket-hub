const queryPayment = require("../services/queryPayment");

async function getPayment(req, res) {
    const filter = req.query;

    const payment = await queryPayment(filter);
    res.send(payment);
}

module.exports = getPayment;
