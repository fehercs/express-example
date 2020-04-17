const express = require('express');
const app = express();

const users = [];
let idIncrement = 0;

const createHandler = (req, res) => {
  const user = {
    id: idIncrement.toString(),
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
  };
  users.push(user);
  idIncrement++;
  res.status(201).json(user);
};

const readHandler = (req, res) => {
  for (const user in users) {
    if (user.id === req.params.id) {
      return res.json(user);
    }
  }
};

const updateHandler = (req, res) => {
  for (const user in users) {
    if (user.id === req.params.id) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.role = req.body.role;
      user.password = req.body.password;
      return res.status(203).json(user);
    }
  }
};

const deleteHandler = (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      users.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.send('Non existing ID!');
};

app.use(express.json());
app.get('user/:id', readHandler());
app.post('user/:id', createHandler());
app.put('user/:id', updateHandler());
app.delete('user/:id', deleteHandler());
