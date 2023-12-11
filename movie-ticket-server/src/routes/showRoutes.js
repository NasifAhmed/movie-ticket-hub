const postShow = require("../controllers/postShow");
const getShow = require("../controllers/getShow");
const morgan = require("morgan");

const router = require("express").Router();

router.post("/show", morgan(`tiny`), postShow);
router.get("/show", morgan(`tiny`), getShow);

module.exports = router;
