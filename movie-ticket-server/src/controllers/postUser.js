const insertUser = require("../services/insertUser");

async function postUser(req, res) {
    await insertUser(req.body).then((response) => {
        return res.send(response);
    });
}

module.exports = postUser;
