//setup router
const express = require('express');
const router = express.Router();

const {signupUser, loginUser} = require('../controllers/authorization_controller');



//routes

//home page route
router.get('/', (req, res) => {
    return res.json('get request: Home');
})

//login route
router.post('/signup', signupUser);

//signup route
router.post('/login', loginUser);


module.exports = router;
