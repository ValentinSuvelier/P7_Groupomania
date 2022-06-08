const Sequelize = require("sequelize");
const sequelize = new Sequelize("groupomania", "root", "sv121094", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./User.js")(sequelize, Sequelize);
db.posts = require("./Post.js")(sequelize, Sequelize);
db.comments = require("./Comment.js")(sequelize, Sequelize);

// RELATION ONETOMANY //
db.comments.belongsTo(db.posts, {
    onDelete: "CASCADE",
    });
db.posts.hasMany(db.comments);

module.exports = db;