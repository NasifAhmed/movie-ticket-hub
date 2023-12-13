const Show = require("../models/show");

async function removeShow(id) {
    try {
        const response = await Show.deleteOne({
            _id: `${id}`,
        });
        console.log("Removed successfully");
        console.log(response);
        return response;
    } catch (err) {
        console.log("Error removing data", err);
    }
}

module.exports = removeShow;
