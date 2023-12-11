//Comment Routes


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('get request: Comments');
});

router.get('/:CommentId', (req, res) => {
    return res.send('Get Request: :CommentId');

    //return res.send(req.context.models.users[req.params.userId]);
});

module.exports = router;