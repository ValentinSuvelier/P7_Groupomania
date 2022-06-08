const db = require('../models/index');
const Comment = db.comments;

// POST
exports.createComment = (req, res, next) => {
    const comment = new Comment({
        username: req.body.username,
        content: req.body.content,
        postId: req.body.PostId,
    })
    comment.save()
        .then(() => {
            res.status(201).json({
                message: 'commentaire créée !'
            })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
};

// DELETE
exports.deleteComment = (req, res, next) => {
          Comment.destroy({where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(500).json({ error }));
};