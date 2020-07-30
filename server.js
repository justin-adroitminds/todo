const express = require('express')
const http = require('http')
const db = require('./dbconnect');
const path = require("path");

const app = express()
var router = new express.Router();

const server = http.createServer(app)
var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(express.static(__dirname + '/dist/my-todo-list'))
app.use("/images",express.static(path.join("public/upload")))
app.use('/',router)

db.connect(() => {
    app.listen(process.env.PORT || 5555, function (){
        console.log(`Listening`);
    });
});

require('./routes/routes.js')(router);


server.listen(3000, ()=>{
    console.log('server started')
})