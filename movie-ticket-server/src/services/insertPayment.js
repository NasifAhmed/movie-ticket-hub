const { Payment } = require("../models/model");

async function insertPayment(data) {
    let payment;

    payment = {
        owner: data.owner,
        camp: data.camp,
        date: data.date,
        amount: data.amount,
        transaction_id: data.transaction_id,
    };

    try {
        const paymentData = new Payment(payment);
        const response = await paymentData.save();
        console.log("Feedback saved successfully");
        console.log(response);
        return response;
    } catch (err) {
        console.log("Error saving feedback", err);
    }
}

module.exports = insertPayment;
