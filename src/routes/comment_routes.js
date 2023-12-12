//Comment Routes


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json('get request: Comments');
});

router.get('/:CommentId', (req, res) => {
    return res.json('Get Request: :CommentId');

    //return res.send(req.context.models.users[req.params.userId]);
});

//post comment route
//router.post('/comment', postComment);

module.exports = router;