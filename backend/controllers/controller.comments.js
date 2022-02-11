const { Comments } = require("../models");


exports.createComment = async (req, res, next)=>{
    try {
           const CommentBody = req.body; // ca contient mon commentBody et le PostId

           // ajouter le username du l'utilisateur dans la BDD, pour afficher dans les comm
           //ajout du UserId pour pouvoir supprimer les commentaires à la suppression du compte
           CommentBody.username = req.user.username;;  
           CommentBody.UserId = req.user.id;                
           //fin
           if (req.body.commentBody === "") {
            res.status(400).json({error : "veuillez remplir le champ du commentaire..."})         
          }else{
            const comments = await Comments.create(CommentBody);
            res.json(comments);
          }



        
          
    }  catch (error) {
           res.status(404).json({ error });
           console.log("erreur lors de la requete createComment", error);
      }
}
exports.getOnePostComments = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const comment = await Comments.findAll({where : { PostId: id} });
        res.json(comment)
      } catch (error) {
        console.log("erreur lors de la requete getOnePostComments", error);
        res.status(404).json({error})    
      }
}
exports.deleteOneComment = async(req, res, next)=>{
  try {
    const commentId = req.params.commentId;
    await Comments.destroy({where:{ id: commentId } });
    res.json("delete réussi !");
  } 
  catch (error) {
    console.log("errur de la requete comment delete",error);
    res.status(404).json({error})
  
  }
}