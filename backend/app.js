const express = require('express');
const app = express();
// headers et sécurise
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


const db = require("./models");
db.sequelize.sync({alter: true});

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;