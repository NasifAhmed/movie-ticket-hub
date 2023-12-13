const postShow = require("../controllers/postShow");
const getShow = require("../controllers/getShow");
const deleteShow = require("../controllers/deleteShow");
const morgan = require("morgan");

const router = require("express").Router();

router.post("/show", morgan(`tiny`), postShow);
router.get("/show", morgan(`tiny`), getShow);
router.delete("/show", morgan(`tiny`), deleteShow);

module.exports = router;
