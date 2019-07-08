import io from 'socket.io-client';

export class SocketService {
  constructor() {}

  name = '';
  message = '';
  messages = [];
  socket = io('localhost:3001');

  loginPlayer(name) {
    this.socket.emit('PLAYER_CONNECTION', {
      name
    });
    console.log(name);
  }

  loginPlayerSuccess() {
    this.socket.on('PLAYER_ADDITION', data => {
      console.log('client message', data);
    });
  }
  getSocketSession() {
    return this.socket;
  }
}
