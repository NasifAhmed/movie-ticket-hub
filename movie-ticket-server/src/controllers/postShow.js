const insertShow = require("../services/insertShow");

async function postShow(req, res) {
    await insertShow(req.body).then((response) => {
        return res.send(response);
    });
}

module.exports = postShow;
