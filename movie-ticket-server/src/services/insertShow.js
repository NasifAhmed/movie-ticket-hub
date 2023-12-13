const Show = require("../models/show");

async function insertShow(data) {
    let show = {
        id: data.id,
        date: data.date,
        seat: data.seat,
        price: data.price,
        review: [...data.review],
    };

    if (data._id) {
        try {
            const response = await Show.updateOne({ _id: data._id }, show, {
                upsert: true,
            });
            console.log("Show updated successfully");
            console.log(response);
            return response;
        } catch (err) {
            console.log("Error updating show", err);
        }
    } else {
        try {
            const newShow = new Show(show);
            const response = await newShow.save();
            console.log("Show saved successfully");
            console.log(response);
            return response;
        } catch (err) {
            console.log("Error saving show", err);
        }
    }
}

module.exports = insertShow;
