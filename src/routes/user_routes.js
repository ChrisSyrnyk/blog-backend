//User Routes

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('get request: Users');
});

router.get('/:userId', (req, res) => {
    return res.send('Get Request: :userId');

    //return res.send(req.context.models.users[req.params.userId]);
});

module.exports = router;