module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {  
      password: {
        type: DataTypes.STRING,
        allowNul: false,
      },
      username: {
        //colum
        type: DataTypes.STRING,
        allowNul: false,
      },

    });
    
    //  Users.associate = (models)=>{
    //    Users.hasMany(models.Posts, { 
    //      onDelete : "cascade",
    //    }) 
    //  }
  
    return Users;
  };
  