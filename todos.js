const fs = require("fs");
const express = require("express");
const { title } = require("process");
const app = express();

app.use(express.json());

let todos = [];

app.get('/', (req, res)=>{
    let todoArr = todos;
    let todoObjects= [];
    let numTodo = todoArr.length
    for(let i=0; i<numTodo; i++){
        todoObjects.push(todoArr[i]);
    }

    res.json({
        todoArr
    })
})

let newId = 0;
app.post('/', (req, res)=>{
    let newTodo = req.body.newTodo;
    newId++;
    todos.push({
        id: newId,
        title: newTodo,
        done: false
    });
    
    res.json({
        msg: "Added Todo"
    })
})

app.delete('/', (req, res)=>{
    let todoArr = todos;
    let todoObjects= [];
    let numTodo = todoArr.length
    let newTodoArr = [];
    for(let i=0; i<numTodo; i++){
        if(todos[i].done === false)
        newTodoArr.push(todoArr[i]);
    }
    todos = newTodoArr;
    let updatedId = 1
    todos.forEach(todo=>{
        todo.id = updatedId;
        updatedId++;
    })
    res.json({
        msg: "Deletion done"
    })
})