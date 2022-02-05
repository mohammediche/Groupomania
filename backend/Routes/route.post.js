const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/controller.post");
const Auth = require("../middleware/Auth");
const multer = require ("../middleware/Multer");

router.post("/",Auth, multer, postCtrl.createPosts); 
router.get("/",Auth, postCtrl.getAllPosts); //on passe Auth pour accéder au userId connecté pour le tableau des likedPostsUserConnect.
router.get("/byId/:id", postCtrl.getOnePost);
router.delete("/byId/:id", postCtrl.deletePost); 
router.put("/byId/:id",Auth, multer, postCtrl.modifyPost); 
router.get("/byUserId/:id", postCtrl.getPostsUser);

module.exports = router;
