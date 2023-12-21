require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const compression = require("compression");
const helmet = require("helmet");

//import models
const BlogPost = require('./models/blog_post_model');
const Comment = require('./models/comment_model');
const User = require('./models/user_model');
//import routes
const UserRoutes = require('./routes/user_routes');
const CommentRoutes = require('./routes/comment_routes');
const BlogPostRoutes = require('./routes/blog_routes');
const HomeRoutes = require('./routes/home_routes');

//setup mongo connection
const mongoDb = process.env.MONGO_KEY;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


//setup app
const app = express();
//setup cors
app.use(cors());
//setup json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Compress all routes
app.use(compression()); 
//add helmet to the middleware chain
app.use(helmet());
//connect routes
app.use('/', HomeRoutes);
app.use('/users', UserRoutes);
app.use('/comments', CommentRoutes);
app.use('/blogposts', BlogPostRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Blog Backend listening on port ${process.env.PORT}!`),
);