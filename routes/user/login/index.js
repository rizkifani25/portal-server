var express = require("express");
var router = express.Router();

const User = require("../../../controllers/user");

router.post("/", User.login);

module.exports = router;
