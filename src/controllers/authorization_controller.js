const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if (!existingUser){
            return res.status(400).json({message: "User does not exist."});
        };
        
        const comparePassword = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!comparePassword){
            return res.status(400).json({message: "Invalid credentials."})
        }

        const token = jwt.sign(
            {username: existingUser.username, id: existingUser._id, type: existingUser.type},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );

        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    };
};

exports.signupUser = async (req, res) => {
    const {username, password, type} = req.body;
    try{
        const existingUser = await User.findOne({ username });
        if (existingUser){
            return res.status(400).json({message: "User already exists."});
        };
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            username,
            password: hashedPassword,
            type,
        });

        const token = jwt.sign(
            {username: result.username, id: result._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    };
}
