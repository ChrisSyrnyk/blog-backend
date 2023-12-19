const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verify_token_middleware');

const {createBlogPost, getBlogPost, getBlogPosts} = require('../controllers/blog_controller');
//const auth = require('../middleware/authorization_middleware');

//routes

router.get('/', getBlogPosts);

router.get('/:BlogPostId', getBlogPost);

router.post('/:BlogPostId', verifyToken, createBlogPost);

module.exports = router;