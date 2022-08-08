require('dotenv').config()


const Sequelize = require("sequelize");
// on masque les info sensibles de connexion à MySQL avec dotenv
const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "+02:00"
  },
  timezone: "+02:00", //for writing to database
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./User.js")(sequelize, Sequelize);
db.posts = require("./Post.js")(sequelize, Sequelize);
db.comments = require("./Comment.js")(sequelize, Sequelize);

// RELATION ONETOMANY //

db.posts.belongsTo(db.user, {
  onDelete: "CASCADE",
  });
db.user.hasMany(db.posts);

db.comments.belongsTo(db.posts, {
  onDelete: "CASCADE",
  });
db.posts.hasMany(db.comments);

db.comments.belongsTo(db.user, {
  onDelete: "CASCADE",
  });
db.user.hasMany(db.comments);

module.exports = db;