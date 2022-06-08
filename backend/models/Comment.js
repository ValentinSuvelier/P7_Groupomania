module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        required: true,
        allowNull: false,
      },
    });

    return Comment;
  };