const postTicket = require("../controllers/postTicket");
const getTicket = require("../controllers/getTicket");
const morgan = require("morgan");

const router = require("express").Router();

router.post("/ticket", morgan(`tiny`), postTicket);
router.get("/ticket", morgan(`tiny`), getTicket);

module.exports = router;
