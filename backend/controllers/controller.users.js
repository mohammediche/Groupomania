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
           const accessToken = sign( 
             {username: user.username, id: user.id, role: user.role}, process.env.TOKEN_SECRET,{
              expiresIn: "24h",
             })
                 //"TOKEN_SECRET" la clé secrete pour l'encodage
              
           res.json(accessToken) // accessToken correspond à la chaine de caractére du Token
       })
       .catch(error =>{ res.status(404).json({error}) })
   })
}

exports.profilPage = async(req, res , next)=>{
  try{
    const id = req.params.id; //id de l'utilisateur
    const informationUser = await Users.findByPk(id, {  
      //ici on exclus le password vu qu'on a pas besoin de l'utiliser au front 
      //(on l'aura besoin plustard pour edit profil connecté)
      attributes: {exclude: ["password"] }, //attributes est obligé, ce n'est pas un nom qu'on choisi *
    });
    res.status(200).json(informationUser);
  }catch(error){
    res.status(404).json({error});
    console.log("erreur lors de la requete profilPage");
  }

}

exports.modifyPassword = async (req, res, next) => {
  try {

    const {oldPassword, newPassword} = req.body; 
    const user = await Users.findOne({ where : {username: req.user.username} });

    //on compare le password que le user a entré avec celui de BDD  
    bcrypt.compare(oldPassword, user.password)
    .then(async(valid)=>{
      if (!valid) {
        return res.json({error : "Erreur, le password est incorrect"});
        // quand c'est erreur 400 c'est avec catch
        // voir axios handle erreurs     
      }
      bcrypt.hash(newPassword, 10).then((hash)=>{
        //on met a jour le password en mettant le hash qui est le newPassword haché !
        Users.update({password: hash}, {where : {username: req.user.username}}) ;
        res.status(201).json("Mot de passe changé avec succés !")
      })
    })
  } catch (error) {
    res.status(404).json({error});
    
  }
}
exports.deleteUser = (req, res, next) =>{
  const userId = req.params.userId; // id de l'utilisateur / qu'on mettera également dans l'url de notre route

  Users.findOne( {where: {id : userId} }) // id c'est l'id de la BDD et userId et l'id qu'on va lui attribuer
  .then((user)=>{
    user.destroy({where: {id : userId} })
    res.status(200).json( {message : "Utilisateur supprimé"} );
  })

  .catch(error => res.status(400).json({error : error}));

}

