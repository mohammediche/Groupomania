const { Comments } = require("../models");


exports.createComment = async (req, res, next)=>{
    try {
        const CommentBody = req.body;
        await Comments.create(CommentBody);
        res.json(CommentBody);
      } catch (error) {
        res.status(404).json({ error });
      }
}
exports.getOnePostComments = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const comment = await Comments.findAll({where : { PostId: id } });
        res.json(comment)
      } catch (error) {
        console.log(error);
      }
}