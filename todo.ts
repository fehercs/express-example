import express, { Request, Response } from 'express';
// const express = require('express');
const app = express();
const port = process.env.API_PORT || 3000;

interface Todo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  authorID: number
}

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  password: string
}

const todos: Array<Todo> = [];
const users: Array<User>  = [];
let todoIndex: number = 0;
let idIncrement: number = 0;

const todoReadHandler = (req: Request, res: Response) => {
  res.json(todos);
};

const todoReadByIdHandler = (req: Request, res: Response) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      return res.json(todos[i]);
    }
  }
  res.send('Non existing ID!');
};

const todoUpdateHandler = (req: Request, res: Response) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      console.log(req.body);
      todos[i].name = req.body.name;
      todos[i].description = req.body.description;
      todos[i].status = req.body.status;
      return res.status(203).json(todos[i]);
    }
  }
  res.send('Non existing ID!');
};

const todoCreateHandler = (req: Request, res: Response) => {
  const todo: Todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    authorID: -1
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

const todoDeleteHandler = (req: Request, res: Response) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(req.params.id)) {
      todos.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.send('Non existing ID!');
};

const userCreateHandler = (req: Request, res: Response) => {
  const user = {
    id: idIncrement,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
  };
  users.push(user);
  idIncrement++;
  res.status(201).json(user);
};

const userReadHandler = (req: Request, res: Response) => {
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      delete user.password;
      return res.json(user);
    }
  }
  res.send({});
};

const userUpdateHandler = (req: Request, res: Response) => {
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      user.username = req.body.username;
      user.email = req.body.email;
      return res.status(203).json(user);
    }
  }
  res.send({});
};

const userDeleteHandler = (req: Request, res: Response) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      users.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.send('Non existing ID!');
};

app.use(express.json());
app.get('/todos', todoReadHandler);
app.post('/todos', todoCreateHandler);
app.get('/todos/:id', todoReadByIdHandler);
app.put('/todos/:id', todoUpdateHandler);
app.delete('/todos/:id', todoDeleteHandler);
app.get('/user/:id', userReadHandler);
app.post('/user', userCreateHandler);
app.put('/user/:id', userUpdateHandler);
app.delete('/user/:id', userDeleteHandler);

app.listen(port, () => { console.log(`I'm listening on ${port}` )});
