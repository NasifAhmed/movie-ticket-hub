const insertPayment = require("../services/insertPayment");

async function postPayment(req, res) {
    try {
        await insertPayment(req.body).then((response) => {
            return res.send(response);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = postPayment;
