import io from 'socket.io-client';

export class SocketService {
  constructor() {}

  name = '';
  data;
  messages = [];
  socket = io('localhost:3001');

  loginPlayer(name) {
    this.socket.emit('PLAYER_CONNECTION', {
      name
    });
    console.log(name);
  }

  loginPlayerSuccess(callback) {
    this.socket.on('PLAYER_ADDITION', data => {
        callback(data);
    });
    
    
  }
  getSocketSession() {
    return this.socket;
  }
}
