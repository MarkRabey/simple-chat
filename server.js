var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , jade = require('jade')
  , io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.jade');
});

io.sockets.on('connection', function(socket) {
  socket.on('setName', function (data) {
      socket.set('user_name', data);
  });
  socket.on('message', function (message) {
      socket.get('user_name', function (error, name) {
          var data = { 'message' : message, user : name };
          socket.broadcast.emit('message', data);
          console.log("user " + name + " sent this : " + message);
      });
  });
});
server.listen(3000);