const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verify_token_middleware');
const {createComment} = require('../controllers/comment_controller');

router.get('/', (req, res) => {
    return res.json('get request: Comments');
});

router.get('/:CommentId', (req, res) => {
    return res.json('Get Request: :CommentId');
    //return res.send(req.context.models.users[req.params.userId]);
});

router.post('/:CommentId', verifyToken, createComment);

//post comment route
//router.post('/comment', postComment);

module.exports = router;