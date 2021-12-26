module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNul: false,
      },
      username : {
        type: DataTypes.STRING,
        allowNul: false,
      }
    });
    return Comments;
  };