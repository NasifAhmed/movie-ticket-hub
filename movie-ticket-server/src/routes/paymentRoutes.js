const router = require("express").Router();
const stripeGateway = require("../controllers/stripeGateway");
const morgan = require("morgan");

router.post("/create-payment-intent", morgan(`tiny`), stripeGateway);

module.exports = router;
