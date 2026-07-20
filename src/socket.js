const { Server } = require('socket.io');

let io;

function initIO(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.IO non initialisé');
  }
  return io;
}

module.exports = { initIO, getIO };
