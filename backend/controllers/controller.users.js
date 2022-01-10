const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
//vérifié si username existe déja dans la BDD, on envoi une erreur, et on récupere cette erreur dans le frontend

exports.signup = (req, res, next)=>{
    console.log(req.body);
    // const {username, password} = req.body;
    bcrypt.hash(req.body.password, 10)

    .then((hash) => {
        // on enregistre les données dans notre BDD
        Users.create({
          username: req.body.username,
          password: hash,
        });
        res.json("Utilisateur crée !")
      })
      .catch((error) => res.status(500).json({ error }));
}

exports.login = async(req,res, next)=>{
     /* trouver l'utilisateur dans la bdd qui correspond à le username rentré par l'utilisateur,
  et si ca n'existe pas, on renvoi une erreur */
   Users.findOne({ where :{ username : req.body.username} })
   .then(user=>{
       if(!user){
         return res.json({error : "Erreur, le username est incorrect"})
       }
       // On compare le mot de passe rentré, avec le hash qui est gardé dans la base de données
       //on renvoi une erreur s'ils ne correspondent pas.
       bcrypt.compare(req.body.password, user.password)
       .then(valid=>{
           if(!valid){
               return res.json({error : "le mot de passe ou le username que vous avez entré n'existent pas..."})
           }
           const accesToken = sign( 
             {username: user.username, id: user.id}, "secretToken",{
                 //"TOKEN_SECRET" la clé secrete pour l'encodage
               expiresIn: "1h",
              })
           res.json(accesToken)
       })
       .catch(error =>{ res.status(404).json({error}) })
   })
}
