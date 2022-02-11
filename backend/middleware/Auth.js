// req = le contenu du front-end pour le ramener et l'utiliser dans le back
// res = back au front (on envoi une reponse au front)
const jwt = require("jsonwebtoken");

// exporter un middleware
module.exports = (req, res, next) => {
  const accessToken = req.header("accessToken"); //"accessToken" qu'on utilisera dans le front-end Comments.js
  // const accessToken = req.headers.authorization.split(" ")[1];
  if(!accessToken){
    return res.json({error : "Utilisateur non authentifié"})
  }
  try {
    const userDataFromToken = jwt.verify(accessToken, process.env.TOKEN_SECRET) //"TOKEN_SECRET" = clé secrete
    
    req.user = userDataFromToken;  // userDataFromToken correspond à username, id et role  du user connect !

    if(userDataFromToken){ 
      return next()
    }
  
  } catch (err) {
    res.json({ error: err}); // on catch l'erreur du front-end
  }
};
