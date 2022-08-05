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

    return User;
  };

  