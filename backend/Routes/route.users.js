const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/controller.users")
const Auth = require("../middleware/Auth");


router.post("/signup",usersCtrl.signup); 
router.post("/login",usersCtrl.login);
router.get("/profil/:id", usersCtrl.profilPage);
router.put("/modifyPassword",Auth ,usersCtrl.modifyPassword); 
//ma route qui vas vérifié si j'ai un token valide ou non (qui vas empéché notament de crée a fake key par la console)
router.get("/verification",Auth, (req,res)=>{
    res.json(req.user);
}); 


module.exports = router;