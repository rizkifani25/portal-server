var express = require("express");
var router = express.Router();

const User = require("../../../controllers/user");

router.get("/", User.getUserPost);

module.exports = router;
