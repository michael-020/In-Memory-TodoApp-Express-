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
    if (!newTodo || newTodo.trim() === "") {
        return res.status(400).json({ msg: "Invalid todo" });
    }
    
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
    let completedTodoId = req.body.completedTodoId;
    if (!completedTodoId) {
        return res.status(400).json({ msg: "No todo provided for completion" });
    }
    
    todos.forEach(todo=>{
        if(todo.id == completedTodoId){
            todo.isDone =  true;
        }
    })
    
    res.json({
        msg: "marked completed todo"
    })
})

app.delete('/', (req, res)=>{
    let numTodo = todos.length
    if(numTodo > 0){
        let newTodoArr = [];
        for(let i=0; i<numTodo; i++){
            if(todos[i].isDone === false)
            newTodoArr.push(todos[i]);
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
    }
    else{
        res.sendStatus(411).json({
                        msg: "You Dont have any todos left to delete"
                    })
    }
})

app.listen(3000)