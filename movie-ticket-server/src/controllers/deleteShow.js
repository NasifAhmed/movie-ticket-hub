const removeShow = require("../services/removeShow");

async function deleteShow(req, res) {
    await removeShow(req.query._id).then((response) => {
        return res.send(response);
    });
}

module.exports = deleteShow;
