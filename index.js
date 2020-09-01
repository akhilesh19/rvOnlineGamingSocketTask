const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let messageList = [];
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {
    messageList.push(msg)
   io.emit('recivedMessage', messageList);
   
 });
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});
