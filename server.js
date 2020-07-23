const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(express.static(__dirname + '/dist/my-todo-list'))

app.get('/*', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
})

// POST method route
app.post('/login', function (req, res) {
    if(req.body.email === 'admin@123.com' && req.body.password === 'password'){
        res.send({status : true})
    }else{
        res.send({status : false})
    }
    
  })

  

const route = express.Router()

app.use('/',route)

server.listen(3000, ()=>{
    console.log('server started')
})