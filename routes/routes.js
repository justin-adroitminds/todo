module.exports = function(router) {
  const uniqid = require('uniqid');
  const db = require('./../dbconnect');
  var ObjectId = require('mongodb').ObjectID;

  router.get('/test', (req, res) => {
    db.get().collection('login').find({username : 'admin@123.com'}).toArray()
    .then((users) => {
              console.log('Users', users);
              res.send(users)
          });
  });

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
            id: uniqid(),
            newTodo: req.body.newTodo,
            completed: false
        };
        let qry = {
          _id : ObjectId(req.body.id)
        }
        db.get().collection("todos").update(qry,
              // should be important to "cast"
          {
             "$push": {
                 "list": {
                     "$each": [todo]
                 }
             }
          }
       )
        // db.get().collection("todos").update(qry, {"$push" : {list : { "$each" : [ todo ]}}})
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

  router.delete('/task/:id/:index', function (req, res) {
    if(req.params.id){
      let qry = {
        _id : ObjectId(req.params.index)
      }
      let pull = {
        id : req.params.id
      }
      db.get().collection("todos").update(qry,
        // should be important to "cast"
      {
        "$pull": {
            "list": {
                pull
            }
            }
          }
      )
      .then((list) => {
        res.send({status : true, list : pull})
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

  router.get('/todolist/:id', function (req, res) {
    db.get().collection('todos').find({_id : ObjectId(req.params.id)}).toArray()
  .then((list) => {
          res.send({status : true, list : list})
        }).catch((e) =>{
          res.send({status : false, list : []})
        });
  })

  router.get('/todos', function (req, res) {
    db.get().collection('todos').find().toArray()
  .then((list) => {
          res.send({status : true, list : list})
        }).catch((e) =>{
          res.send({status : false, list : []})
        });
  })

  router.post('/addtodo', function (req, res) {
    if(req.body.name){
        let todo = {
            name: req.body.name,
            list : []
        };
        db.get().collection("todos").insertOne(todo)
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

  router.get('*', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
  })

}