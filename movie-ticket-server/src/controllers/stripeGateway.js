require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SK);

async function stripeGateway(req, res) {
    const { price } = req.body;
    const amount = parseInt(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
    });

    return res.send({
        clientSecret: paymentIntent.client_secret,
    });
}

module.exports = stripeGateway;
