const postCtrl = require('../controllers/post');
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();


router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPost);
router.put('/:id', auth, multer, postCtrl.updatePost);

module.exports = router;