const express = require('express');
const app = express();

const todos = [];
let todoIndex = 0;

const todoGetHandler = (req, res) => {
  res.json(todos);
};

const todoGetByIdHandler = (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.params.id) {
      return res.json(todos[i]);
    }
  }
  res.send('Non existing ID!');
};

const todoPutHandler = (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.params.id) {
      console.log(req.body);
      todos[i].name = req.body.name;
      todos[i].description = req.body.description;
      todos[i].status = req.body.status;
      return res.status(203).json(todos[i]);
    }
  }
  res.send('Non existing ID!');
};

const todoPostHandler = (req, res) => {
  const todo = {
    id: todoIndex.toString(),
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    author: 'anonymus'
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

const todoDeleteHandler = (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.params.id) {
      todos.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.send('Non existing ID!');
};

app.use(express.json());
app.get('/todos', todoGetHandler);
app.post('/todos', todoPostHandler);
app.get('/todos/:id', todoGetByIdHandler);
app.put('/todos/:id', todoPutHandler);
app.delete('/todos/:id', todoDeleteHandler);

app.listen(3000);
