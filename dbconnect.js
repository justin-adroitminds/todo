const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'todo';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  const collection = db.collection('todo');
  var cursor=db.collection('login').find({username: "admin@123.com"})
  cursor.each(function(err, doc) {

    console.log(doc);

});
  client.close();
});