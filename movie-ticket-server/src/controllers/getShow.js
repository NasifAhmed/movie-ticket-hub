const queryShow = require("../services/queryShow");

async function getShow(req, res) {
    const filter = req.query;

    const shows = await queryShow(filter);
    res.send(shows);
}

module.exports = getShow;
