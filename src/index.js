require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//import models
const BlogPosts = require('./models/blog_post_model');
const Comments = require('./models/comment_model');
const Users = require('./models/user_model');
//import routes
const UserRoutes = require('./routes/user_routes');
const CommentRoutes = require('./routes/comment_routes');
const BlogPostRoutes = require('./routes/blog_routes');

//setup app
const app = express();
//setup cors
app.use(cors());
//setup json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect routes
app.use('/users', UserRoutes);
app.use('/comments', CommentRoutes);
app.use('/blogposts', BlogPostRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);