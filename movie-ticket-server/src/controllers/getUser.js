const queryUser = require("../services/queryUser");

async function getUser(req, res) {
    const filter = req.query;

    const user = await queryUser(filter);
    res.send(user);
}

module.exports = getUser;
