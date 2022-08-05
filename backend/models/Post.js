module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      title: {
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
    
    return Post;
  };