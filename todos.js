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