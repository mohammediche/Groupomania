const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/controller.users")
const Auth = require("../middleware/Auth");


router.post("/signup",usersCtrl.signup); 
router.post("/login",usersCtrl.login);
router.get("/profil/:id", usersCtrl.profilPage);
router.put("/modifyPassword",Auth ,usersCtrl.modifyPassword); 
router.delete("/deleteUser/:userId",Auth, usersCtrl.deleteUser);


module.exports = router;