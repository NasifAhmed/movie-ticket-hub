const postUser = require("../controllers/postUser");
const getUser = require("../controllers/getUser");
const morgan = require("morgan");

const router = require("express").Router();

router.post("/user", morgan(`tiny`), postUser);
router.get("/user", morgan(`tiny`), getUser);

module.exports = router;
