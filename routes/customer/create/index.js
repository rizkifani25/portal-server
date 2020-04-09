var express = require("express");
var router = express.Router();

const Customer = require("../../../controllers/user");

router.get("/", Customer.addData);

module.exports = router;
