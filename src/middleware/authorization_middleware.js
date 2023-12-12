const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

exports.auth = (req, res,next) => {
    try{
        const token = req.header.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        if (token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.UserId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.UserId = decodedData?.sub;
        }
        next();
    } catch (error){}
}

/*
might be usefull in the future

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};

*/