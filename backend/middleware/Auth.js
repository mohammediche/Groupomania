// req = le contenu du front-end pour le ramener et l'utiliser dans le back
// res = back au front (on envoi une reponse au front)
const jwt = require("jsonwebtoken");

// exporter un middleware
module.exports = (req, res, next) => {
  const accessToken = req.header("accessToken"); //"accessToken" qu'on utilisera dans le front-end Comments.js
  if(!accessToken){
    return res.json({error : "Utilisateur non authentifié"})
  }
  try {
    const validToken = jwt.verify(accessToken, "secretToken") //"secretToken" = clé secrete
    
    req.user = validToken; 

    if(validToken){ 
      return next()
    }
  
  } catch (err) {
    res.json({ error: err}); // on catch l'erreur du front-end
  }
};
