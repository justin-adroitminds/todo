const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const mongoDbUrl = 'mongodb://localhost:27017';
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, db) => {
        mongodb = db.db('todo');
        callback();
    });
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};