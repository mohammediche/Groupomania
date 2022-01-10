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

    });
    
     Users.associate = (models)=>{
       Users.hasMany(models.Likes, { 
         onDelete : "cascade",
       }) 
     }
  
    return Users;
  };
  