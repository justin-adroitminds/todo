const express = require('express')
const http = require('http')

const app = express()
var router = new express.Router();

const server = http.createServer(app)
var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(express.static(__dirname + '/dist/my-todo-list'))
app.use('/',router)

require('./routes/routes.js')(router);

server.listen(3000, ()=>{
    console.log('server started')
})