module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    // création d'une table Posts
    title: {
      //note : title a changer pour le name du user
      //colum
      type: DataTypes.STRING,
      allowNul: false,
    },
    postText: {
      //colum
      type: DataTypes.STRING,
      allowNul: false,
    },
    username: {
      //colum
      type: DataTypes.STRING,
      allowNul: false,
    },
  });
  // fonction pour associé la table posts à comments
   Posts.associate = (models)=>{
     Posts.hasMany(models.Comments, {
       onDelete : "cascade",
     }) /* Comments c'est le nom de la fonction dans comments.js */
   }

  return Posts;
};
