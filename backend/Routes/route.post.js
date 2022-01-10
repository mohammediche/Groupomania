const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/controller.post")
const Auth = require("../middleware/Auth")

router.post("/",Auth, postCtrl.createPosts); 
router.get("/", postCtrl.getAllPosts);
router.get("/byId/:id/", postCtrl.getOnePost);
router.delete("/byId/:id/", postCtrl.deletePost); 
router.put("/byId/:id", postCtrl.modifyPost); 

module.exports = router;
