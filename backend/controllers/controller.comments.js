const { Comments } = require("../models");


exports.createComment = async (req, res, next)=>{
    try {
           const CommentBody = req.body;

           //pour ajouter le username  du l'utilisateur dans la BDD, pour afficher dans les comm
           const username = req.user.username;
           CommentBody.username = username;
           
            
           //fin

            const comments = await Comments.create(CommentBody);
            console.log(req.body.commentBody);
            if (req.body.commentBody === null) {
              res.status(400).json({error : "veuillez remplir le champ du commentaire..."})         
            }else{
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
        const comment = await Comments.findAll({where : { PostId: id } });
        res.json(comment)
      } catch (error) {
        res.status(404).json({error})
        console.log("erreur lors de la requete getOnePostComments", error);
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
  // .then(() => res.status(200).json({ message: "commentaire supprimé !" }))
  // .catch(err =>{error = err})

}