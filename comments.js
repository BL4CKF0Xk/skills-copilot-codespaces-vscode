// create web server
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

// create socket server
var io = require('socket.io').listen(server);

// create comments array
var comments = [];

// serve comments.json
app.get('/comments.json', function(req, res){
  res.json(comments);
});

// serve index.html
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

// listen for new connections
io.sockets.on('connection', function(socket){
  // listen for new comments
  socket.on('send comment', function(data){
    comments.push(data);
    io.sockets.emit('comment added', data);
  });
});

// listen on port 3000
server.listen(3000);
console.log('Server listening on port 3000');