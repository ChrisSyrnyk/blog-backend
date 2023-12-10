require('dotenv/config');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Data
let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };

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

  app.get('/users', (req, res) => {
    console.log('ran get users')
    return res.send(Object.values(users));
  });
  
  app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
  });

  app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
  });
  
  app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
  });

  app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
    };
  
    messages[id] = message;
    console.log('new message');
    return res.send(message);
  });

  app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = messages;
  
    messages = otherMessages;
  
    return res.send(message);
  });

  app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);