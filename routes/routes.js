module.exports = function(router) {

  const db = require('./../dbconnect');
  var ObjectId = require('mongodb').ObjectID;

  router.get('/test', (req, res) => {
    db.get().collection('login').find({username : 'admin@123.com'}).toArray()
    .then((users) => {
              console.log('Users', users);
              res.send(users)
          });
  });

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
  db.get().collection('login').find({username : req.body.email}).toArray()
  .then((users) => {
            if(users[0].password === req.body.password){
              res.send({status : true, list : []})
            }else{
              res.send({status : false, list : []})
            }
        }).catch((e) =>{
          res.send({status : false, list : []})
        });
  })

  router.post('/addtask', function (req, res) {
    if(req.body.newTodo){
        let todo = {
            newTodo: req.body.newTodo,
            completed: false
        };
        db.get().collection("todo").insertOne(todo)
        .then((list) => {
          res.send({status : true, list : todo})
        }).catch((e) =>{
          console.log(e)
        });
        // todolist.push(todo);
    }else{
        res.send({status : false, list : []})
    }
  })

  router.delete('/task/:id', function (req, res) {
      console.log(req.params.id)
    if(req.params.id){
      let todo = {
        _id : ObjectId(req.params.id)
      }
      db.get().collection("todo").deleteOne(todo)
      .then((list) => {
        res.send({status : true, list : todo})
      }).catch((e) =>{
        console.log(e)
      });
    }else{
        res.send({status : false, list : todolist})
    }
    
  })

  router.put('/updatetask/', function (req, res) {
    if(req.body){
      let qry = {
        _id : ObjectId(req.body._id)
      }
      let completed = !req.body.completed;
      let update = {
        newTodo : req.body.newTodo,
        completed : completed
      }
      db.get().collection("todo").updateOne(qry, {"$set" : update})
      .then((list) => {
        res.send({status : true, list : update})
      }).catch((e) =>{
        console.log(e)
      });
    }else{
        res.send({status : false, list : todolist})
    }
  })

  router.get('/todolist', function (req, res) {
    db.get().collection('todo').find().toArray()
  .then((list) => {
          res.send({status : true, list : list})
        }).catch((e) =>{
          res.send({status : false, list : []})
        });
  })

  router.get('*', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
  })

}