require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
//connect routes
app.use('/', HomeRoutes);
app.use('/users', UserRoutes);
app.use('/comments', CommentRoutes);
app.use('/blogposts', BlogPostRoutes);

/*
//setup security
app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});
*/




app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);