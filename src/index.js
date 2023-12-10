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
const routes = require('./routes');

//setup app
const app = express();
//setup cors
app.use(cors());
//setup json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
      models,
      user: models.users[1], //replace with real user in future
    };
    next();
  });

  app.use('/session', routes.session);
  app.use('/users', routes.user);
  app.use('/messages', routes.message);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);