const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getAllUsers);
router.delete('/:id', auth, userCtrl.deleteUserById);

module.exports = router;