const { Posts, Likes } = require("../models");

// NOS ROUTES CRUD PRINCIPAL
exports.createPosts = async (req, res, next)=>{
    try {
        const PostBody = {
          image : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          title : req.body.title,
          postText : req.body.postText
      }
      PostBody.username = req.user.username; // req.user correspond aux données de l'utilisateur connecté ! voir fichier Auth si besoin
      PostBody.UserId = req.user.id;
        
        await Posts.create(PostBody);
          console.log(" ==========>");
          console.log(PostBody);

        res.status(201).json(PostBody);
      } catch (error) {
        res.status(404).json({ error });
      }
}
exports.getAllPosts = async (req, res, next)=>{ 
    try {
        const allPost = await Posts.findAll({include: [Likes]}); //allPost sont les posts en détails
        const likedPostsUserConnect = await Likes.findAll({where : {UserId : req.user.id} });
        //likedPostsUserConnect renvoi un tableau des posts liker par l'utilisateur connecté ! 
        res.status(200).json({allPost: allPost, likedPostsUserConnect: likedPostsUserConnect}); 
      } catch (error) {
        res.status(404).json(error);
        console.log("erreur lors de la requete getAllPosts");
      }
}
exports.getOnePost = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id);
        res.status(200).json(post)
      } catch (error) {
        res.status(404).json({error});
        console.log("erreur lors de la requete getOnePost");
        
      }
}
exports.deletePost = async (req, res, next)=>{
    try {
        const id = req.params.id;
        await Posts.destroy({where:{ id: id } });
        res.status(200).json("delete");
      } catch (error) {
        res.status(404).json({error});
        console.log("errur de la requete delete");  
      }
}
exports.modifyPost = async (req, res, next)=>{
    try {
        const PostBody = req.body;
        await Posts.update(PostBody, {where : {id: req.params.id}});
        res.status(200).json(PostBody);
      } 
    catch (error) {
        res.status(404).json({ error });
      }
}

// on récupere tout les posts d'un seul utilisateur dans la page profil
exports.getPostsUser = async(req, res, next)=>{
  try {
    const id = req.params.id;
    const PostsOfUser = await Posts.findAll({where:  {UserId: id}})

    res.status(200).json(PostsOfUser);
    
  } catch (error) {
    res.status(404).json(error);
    
  }
}