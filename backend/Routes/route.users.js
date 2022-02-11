const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/controller.users")
const Auth = require("../middleware/Auth");
const passwordValidator = require("../middleware/PasswordAuth");


router.post("/signup",passwordValidator, usersCtrl.signup); 
router.post("/login",usersCtrl.login);
router.get("/profil/:id", usersCtrl.profilPage);
router.put("/modifyPassword",Auth,usersCtrl.modifyPassword); 
router.delete("/deleteUser",Auth, usersCtrl.deleteUser);
router.delete("/deleteAnyUser/:userId", Auth, usersCtrl.deleteAnyUser);


module.exports = router;