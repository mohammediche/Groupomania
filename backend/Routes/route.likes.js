const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/controller.likes");
const Auth = require("../middleware/Auth")

router.post("/",Auth, likesCtrl.doLike);

module.exports = router;