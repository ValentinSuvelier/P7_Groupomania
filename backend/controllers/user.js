const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.user;

//Inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 8)
      .then(hash => {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


//Connexion d'un utilisateur existant dans la DB
exports.login = (req, res, next) => {
    User.findOne({ where:{ email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      let valid = bcrypt.compare(req.body.password, user.password)
      console.log(valid)
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userData: user,
            /* Encodage d'un nouveau Token contenant l'ID de l'utilisateur */
            token: jwt.sign(
                { userId: user.id, isAdmin: user.isAdmin },
                'RANDOM_TOKEN_SECRET',
            /* Durée du Token défini à 24h, l'utilisateur devra donc se reco aubout de 24h */
                { expiresIn: '24h' }
              )
        })
    })
    .catch(error => res.status(500).json({ error }));
};

//GET ALL POSTS
exports.getAllUsers = (req, res, next) => {
  User.findAll()
      .then((users) => {
          res.status(200).json(users);
      })
      .catch(err => res.status(400).json(err))
};

// DELETE
exports.deleteUserById = (req, res, next) => {
  User.destroy({where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'User supprimé !'}))
    .catch(error => res.status(500).json({ error }));
};