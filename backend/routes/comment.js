const commentCtrl = require('../controllers/comment');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;