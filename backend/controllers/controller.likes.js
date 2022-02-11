const { Likes } = require("../models");

exports.doLike = async(req, res, next)=>{
    try {
        const {PostId} = req.body;
        const UserId = req.user.id;  //voir fichier user où user.id a été stocker dans id, 

        const LikeExist = await Likes.findOne({ //Mettre ce await est trés important, sans ca, on peux pas relike.
            where: { PostId:PostId, UserId: UserId }
        })
        if (!LikeExist) {
            await Likes.create({ PostId:PostId, UserId: UserId })
            res.status(201).json({Liked: true});
        } else {
            await Likes.destroy ({ where: { PostId: PostId, UserId: UserId } });
            res.status(200).json({Liked: false});
        }
        
      }  
    catch (error) {
        res.status(404).json({ message:"erreur lors de la requete doLike" + error });
      }

}