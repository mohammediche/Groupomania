module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {  
      password: {
        type: DataTypes.STRING,
        allowNul: false,
        // validate: {
        //   len: {
        //     args : [5, 20],
        //     msg : "erreur, votre mot de passe doit contenir en moins 5 caractères"
        //   }
        // }
      },
      username: {
        //colum
        type: DataTypes.STRING,
        allowNul: false,
        unique : true,
        // validate:{
        //   len: {
        //     args : [5, 20],
        //     msg : "erreur, votre username doit contenir en moins 5 caractères"
        //   }
        // }
      },

      role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,      
      },

      // imageProfil: {
      //   type: DataTypes.STRING,
      //   defaultValue: "https://static.jobat.be/uploadedImages/grandprofilfb.jpg",      
      // },

    });
    
     Users.associate = (models)=>{
       //un user a plusieurs likes
       //un user peut likes plusieurs posts
       //un user peut avoir plusieurs commentaires
       Users.hasMany(models.Likes, { 
         onDelete : "cascade",
       });
       Users.hasMany(models.Posts, { 
        onDelete : "cascade",
      });
      Users.hasMany(models.Comments, { 
        onDelete : "cascade",
      });
   
     }
  
    return Users;
  };
  