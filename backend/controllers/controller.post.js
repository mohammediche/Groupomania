const { Posts, Likes } = require("../models");
const fs = require("fs");

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
          res.status(201).json(PostBody);
          console.log("l'id est undefined à la création du post, mais quand on log dans allPost, les id des différents posts sont la ! ====>");
          console.log(PostBody);

      }   catch (error) {
          res.status(404).json({ error });
      }
}
exports.getAllPosts = async (req, res, next)=>{ 
    try {
        const allPost = await Posts.findAll({ order: [['updatedAt', 'DESC']],include: [Likes]  }) //allPost sont les posts en détails
  
        // ({include: [Likes]});
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
exports.deletePost =  (req, res, next)=>{
    try {
        const id = req.params.id; //id du post
        Posts.findOne({where:{ id: id } })
        .then((post)=>{
          const filename = post.image.split("/images/")[1]; // (split renvoi un tableau de 2 élements, un qui vient avant le /images/, et un apres qui est le nom du fichier(filename))

          fs.unlink(`images/${filename}`, () => {
            //on supprime avec unlink,
            post.destroy({where:{ id: id } });
            res.status(200).json("delete");
          });

        })

      } catch (error) {
        res.status(404).json({error});
        console.log("errur de la requete delete");  
      }
}
exports.modifyPost = async (req, res, next)=>{
    try {


      const PostBody = {
        image :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        title : req.body.title,
        postText : req.body.postText
       }
       PostBody.username = req.user.username; // req.user correspond aux données de l'utilisateur connecté ! voir fichier Auth si besoin
       PostBody.UserId = req.user.id;

       console.log("this is my body req ===>");
       console.log(req.body);

        await Posts.update(PostBody, {where : {id: req.params.id}})
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