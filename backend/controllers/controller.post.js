const { Posts } = require("../models");

// NOS ROUTES CRUD PRINCIPAL
exports.createPosts = async (req, res, next)=>{
    try {
        const PostBody = req.body;
        await Posts.create(PostBody);
        res.json(PostBody);
      } catch (error) {
        res.status(404).json({ error });
      }
}
exports.getAllPosts = async (req, res, next)=>{
    try {
        const allPost = await Posts.findAll();
        res.json(allPost);
      } catch (error) {
        res.json(error);
      }
}
exports.getOnePost = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id);
        res.json(post)
      } catch (error) {
        console.log(error);
        
      }
}
exports.deletePost = async (req, res, next)=>{
    try {
        const id = req.params.id;
        await Posts.destroy({where:{ id: id } });
        res.json("delete");
      } catch (error) {
        console.log("errur de la requete delete",error);
      
      }
}
exports.modifyPost = async (req, res, next)=>{
    try {
        const PostBody = req.body;
        await Posts.update(PostBody, {where : {id: req.params.id}});
        res.json(PostBody);
      } 
    catch (error) {
        res.status(404).json({ error });
      }
}