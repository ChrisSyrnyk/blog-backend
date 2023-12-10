require('dotenv/config');
const express = require('express');
const cors = require('cors');

const models = require('./models');
const routes = require('./routes');

const app = express();

app.use(cors());

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