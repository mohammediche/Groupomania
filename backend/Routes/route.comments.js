const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/controller.comments");
const Auth = require("../middleware/Auth");

router.post("/", Auth, commentsCtrl.createComment); 
router.get("/:id", commentsCtrl.getOnePostComments);




module.exports = router;