const path = require('path');
const express = require('express');
const app = express();

const socket = require('socket.io');

// settings
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

// listen the server
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('socket connection opened:', socket.id);

  socket.on('chat:message', function(data) {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', function(data) {
    socket.broadcast.emit('chat:typing', data);
  });

  socket.on('chat:username-entered', function(data){
    socket.broadcast.emit('chat:username-entered', data);

  socket.on("disconnect", function (){
    socket.broadcast.emit('disconnected');
    console.log(socket.id, "has disconnected");
  });
})
});