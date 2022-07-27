module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isAdmin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      firstname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
    });
  
    // l'utilisateur peut avoir plusieur posts, si l'utilisateur est supprimé ces posts le seront aussi
    // User.associate = models => {
    //   User.hasMany(models.Post, {
    //       onDelete: "cascade"
    //   });
    // }

    return User;
  };

  