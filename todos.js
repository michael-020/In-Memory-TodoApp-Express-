const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

let todos = [];
function saveTodosToFile(){
    fs.writeFile("a.txt", JSON.stringify(todos, null, 2), (err) => {
        if (err) throw err;
        console.log('Todos saved to a.txt');
    });
}

fs.readFile("a.txt", (err, data) => {
    if (err && err.code !== 'ENOENT') throw err;  // Ignore file not found error
    if (data) {
        todos = JSON.parse(data);
    }
});

app.get('/todos', (req, res)=>{
    res.json({
        todos
    })
})

let newId = 1;
app.post('/addTodo', (req, res)=>{
    let newTodo = req.body.newTodo;
   
    if (!newTodo || newTodo.trim() === "") {
        return res.status(400).json({ msg: "Invalid todo" });
    }
    let newID = 1;
    todos.push({
        id: newId,
        title: newTodo,
        isDone: false
    });
    
    if(todos.length > 0){
        
        todos.forEach(todo=>{
            todo.id = newId;
            newId++;
        })
        newId = 1;
    }
    saveTodosToFile()
    res.json({
        msg: "Added Todo"
    })
})

app.put('/updateTodo', (req, res) => {
    let completedTodoId = req.body.completedTodoId;
    if (!completedTodoId) {
        return res.status(400).json({ msg: "No todo provided for completion" });
    }
    
    todos.forEach(todo=>{
        if(todo.id == completedTodoId){
            todo.isDone =  true;
        }
    })
    saveTodosToFile()
    res.json({
        msg: "marked completed todo"
    })
})

app.delete('/deleteTodo', (req, res)=>{
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
        saveTodosToFile()
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