const { Posts, Likes } = require("../models");

// NOS ROUTES CRUD PRINCIPAL
exports.createPosts = async (req, res, next)=>{
    try {
        const PostBody = req.body;
        await Posts.create(PostBody);
        res.status(201).json(PostBody);
      } catch (error) {
        res.status(404).json({ error });
      }
}
exports.getAllPosts = async (req, res, next)=>{
    try {
        const allPost = await Posts.findAll({include: [Likes]}); // stocker les likes [] de chaque post.
        res.status(200).json(allPost);
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