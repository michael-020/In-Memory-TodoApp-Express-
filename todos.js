const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

app.get('/', (req, res)=>{
    // let todoArr = todos;
    // let todoObjects= [];
    // let numTodo = todoArr.length
    // for(let i=0; i<numTodo; i++){
    //     todoObjects.push(todoArr[i]);
    // }

    res.json({
        todos
    })
})

let newId = 0;
app.post('/', (req, res)=>{
    let newTodo = req.body.newTodo;
    newId++;
    todos.push({
        id: newId,
        title: newTodo,
        isDone: false
    });
    
    res.json({
        msg: "Added Todo"
    })
})

app.put('/', (req, res) => {
    let completedTodo = req.body.completedTodo;
    todos.forEach(todo=>{
        if(todo.title == completedTodo){
            todo.isDone =  true;
        }
    })
    
    res.json({
        msg: "marked completed todo"
    })
})

app.delete('/', (req, res)=>{
    let todoArr = todos;
    let todoObjects= [];
    let numTodo = todoArr.length
    let newTodoArr = [];
    for(let i=0; i<numTodo; i++){
        if(todos[i].isDone === false)
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

app.listen(3000)