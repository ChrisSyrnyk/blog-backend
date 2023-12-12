const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verify_token_middleware');

const {createBlogPost} = require('../controllers/blog_controller');
//const auth = require('../middleware/authorization_middleware');

//routes
router.get('/', (req, res) => {
    return res.json('get request: Blog Posts');
});

router.get('/:BlogPostId', (req, res) => {
    return res.json('Get Request: :BlogPostId');

    //return res.send(req.context.models.users[req.params.userId]);
});

router.post('/:BlogPostId', verifyToken, createBlogPost);

module.exports = router;