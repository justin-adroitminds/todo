const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(express.static(__dirname + '/dist/my-todo-list'))

app.get('/', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
})

app.get('/login', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
})

app.get('/to-do', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
})

let todolist = [{
    newTodo: 'Task 1',
    completed: false
  },
  {
    newTodo: 'Task 2',
    completed: false
  },
  {
    newTodo: 'Task 3',
    completed: false
  }
];
// POST method route
app.post('/login', function (req, res) {
    if(req.body.email === 'admin@123.com' && req.body.password === 'password'){
        res.send({status : true, list : []})
    }else{
        res.send({status : false, list : []})
    }
    
  })
  app.post('/addtask', function (req, res) {
    if(req.body.newTodo){
        let todo = {
            newTodo: req.body.newTodo,
            completed: false
        };
        todolist.push(todo);
        res.send({status : true, list : todolist})
    }else{
        res.send({status : false, list : todolist})
    }
    
  })

  app.delete('/task/:id', function (req, res) {
      console.log(req.params.id)
    if(req.params.id){
        if (todolist[req.params.id].completed){
            todolist[req.params.id].completed = false;
          }
          todolist.splice(req.params.id, 1);
          console.log(todolist);
        res.send({status : true, list : todolist})
    }else{
        res.send({status : false, list : todolist})
    }
    
  })

  app.get('/updatetask/:index', function (req, res) {
    if(req.params.index){
        if (todolist[req.params.index].completed){
            todolist[req.params.index].completed = false;
          }else{
            todolist[req.params.index].completed = true;
          }
        res.send({status : true, list : todolist})
    }else{
        res.send({status : false, list : todolist})
    }
    
  })


  app.get('/todolist', function (req, res) {
    res.send({status : true, list : todolist})
  })
  

const route = express.Router()

app.use('/',route)

server.listen(3000, ()=>{
    console.log('server started')
})