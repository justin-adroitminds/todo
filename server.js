const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

app.use(express.static(__dirname + '/dist/my-todo-list'))

app.get('/', (req,res)=>{
    res.sendfile('./dist/my-todo-list/index.html')
})
const route = express.Router()

app.use('/',route)

server.listen(3000, ()=>{
    console.log('server started')
})