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

  getPlayersList(callback) {
    this.socket.on('PLAYER_LIST', data => {
      callback(data);
    }); 
  }

  getEventLogs(callback) {
    this.socket.on('LOG_INFO', data => {
      callback(data);
    });
  }
}
