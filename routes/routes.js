module.exports = function(router) {

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
router.post('/login', function (req, res) {
    if(req.body.email === 'admin@123.com' && req.body.password === 'password'){
        res.send({status : true, list : []})
    }else{
        res.send({status : false, list : []})
    }
    
  })
  router.post('/addtask', function (req, res) {
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

  router.delete('/task/:id', function (req, res) {
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

  router.put('/updatetask/', function (req, res) {
    if(req.body){
        let index = req.body.id
        if (todolist[index].completed){
            todolist[index].completed = false;
          }else{
            todolist[index].completed = true;
          }
        res.send({status : true, list : todolist})
    }else{
        res.send({status : false, list : todolist})
    }
    
  })

  router.get('/todolist', function (req, res) {
    res.send({status : true, list : todolist})
  })

  router.get('*', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
  })

}