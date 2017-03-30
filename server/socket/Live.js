const socketio = require('socket.io');

class Live {

  constructor(server) {
    this.io = socketio.listen(server);
    this.io.of('/live').on('connection', (socket) => {
      this.socket = socket;

      // connect
      console.log(`connected: ${this.socket.id}`);

      // disconnect
      this.socket.on('disconnect', () => {
        console.log(`disconnected: ${this.socket.id}`);
      });

    });
  }

}

module.exports = Live;
