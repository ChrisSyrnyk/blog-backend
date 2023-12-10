require('dotenv/config');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const models = require('./models/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



//Methods
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
  });
  
app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
  });
  
app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
  });
  
app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
  });
  
app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
  });
  
app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.messages[id] = message;
  
    return res.send(message);
  });
  
app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
  
    req.context.models.messages = otherMessages;
  
    return res.send(message);
  });

  app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);