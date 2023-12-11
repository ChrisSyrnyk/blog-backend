//Blog routes

//User Routes

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('get request: Blog Posts');
});

router.get('/:BlogPostId', (req, res) => {
    return res.send('Get Request: :BlogPostId');

    //return res.send(req.context.models.users[req.params.userId]);
});

module.exports = router;