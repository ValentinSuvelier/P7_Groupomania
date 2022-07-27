require('dotenv').config()

const Sequelize = require("sequelize");
// on masque les info sensibles de connexion à MySQL avec dotenv
const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
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

// supprime les commentaires contenu dans le post supprimé
db.comments.belongsTo(db.user, {
  onDelete: "CASCADE",
  });
db.user.hasMany(db.comments);

db.posts.belongsTo(db.user, {
  onDelete: "CASCADE",
  });
db.user.hasMany(db.posts);

db.comments.belongsTo(db.posts, {
  onDelete: "CASCADE",
  });
db.posts.hasMany(db.comments);



module.exports = db;