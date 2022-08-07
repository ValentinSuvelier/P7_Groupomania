const fs = require('fs');
const db = require('../models/index');
const Post = db.posts;
const Comment = db.comments;

// POST
exports.createPost = (req, res, next) => {
    console.log(req.body)
    const postObject = req.body;
    const post = req.file ?
    //si req.file existe il prend le body et l'image sinon il prend le body sans image (ternaire)
    {
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...postObject
    }
    Post.create(post)
        .then(() => {
            res.status(201).json({
                message: 'post créée !'
            })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
};

// DELETE
exports.deletePost = (req, res, next) => {
    Post.findByPk(req.params.id)
    // ici on veut que l'image soit supprimée en même temps que notre post
      .then(post => {
          if(post.imageUrl) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Post.destroy({where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
          } else {
            Post.destroy({where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          }
      })
      .catch(error => res.status(500).json({ error }));
};

//GET ALL POSTS
exports.getAllPost = (req, res, next) => {
    Post.findAll({
      include: Comment
    })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch(err => res.status(400).json(err))
};