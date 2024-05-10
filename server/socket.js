const handleSocketIO = (io, socket) => {
  console.log('A user connected.');

  // An example of how to handle messages/events from the client.
  socket.on('client-message', (msg) => {
    io.emit('server-message', 'A reply to the client.'); // Emit the message to all clients.
    socket.emit('server-message', 'A reply to the client.'); // Respond to the sender only.
    socket.broadcast.emit('server-message', 'A reply to the client.'); // Broadcast to all other clients except the sender.
    console.log('Message: ' + msg);
  });

  // socket.on('chat-message', (msg) => {
  //   socket.emit('chat-message', `Client: ${msg}`); // Respond to the sender only.
  //   socket.emit('chat-message', `Server: A reply to the client.`); // Respond to the sender only.
  // });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
};

module.exports = handleSocketIO;
