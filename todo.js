"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const express = require('express');
var app = express_1.default();
var port = process.env.API_PORT || 3000;
var todos = [];
var users = [];
var todoIndex = 0;
var idIncrement = 0;
var todoReadHandler = function (req, res) {
    res.json(todos);
};
var todoReadByIdHandler = function (req, res) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === parseInt(req.params.id)) {
            return res.json(todos[i]);
        }
    }
    res.send('Non existing ID!');
};
var todoUpdateHandler = function (req, res) {
    for (var i = 0; i < todos.length; i++) {
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
var todoCreateHandler = function (req, res) {
    var todo = {
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
var todoDeleteHandler = function (req, res) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === parseInt(req.params.id)) {
            todos.splice(i, 1);
            return res.sendStatus(204);
        }
    }
    res.send('Non existing ID!');
};
var userCreateHandler = function (req, res) {
    var user = {
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
var userReadHandler = function (req, res) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        if (user.id === parseInt(req.params.id)) {
            delete user.password;
            return res.json(user);
        }
    }
    res.send({});
};
var userUpdateHandler = function (req, res) {
    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        if (user.id === parseInt(req.params.id)) {
            user.username = req.body.username;
            user.email = req.body.email;
            return res.status(203).json(user);
        }
    }
    res.send({});
};
var userDeleteHandler = function (req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(req.params.id)) {
            users.splice(i, 1);
            return res.sendStatus(204);
        }
    }
    res.send('Non existing ID!');
};
app.use(express_1.default.json());
app.get('/todos', todoReadHandler);
app.post('/todos', todoCreateHandler);
app.get('/todos/:id', todoReadByIdHandler);
app.put('/todos/:id', todoUpdateHandler);
app.delete('/todos/:id', todoDeleteHandler);
app.get('/user/:id', userReadHandler);
app.post('/user', userCreateHandler);
app.put('/user/:id', userUpdateHandler);
app.delete('/user/:id', userDeleteHandler);
app.listen(port, function () { console.log("I'm listening on " + port); });
