import io from 'socket.io-client';

export class SocketService {
  constructor() {}

  currentUser='';
  data;
  messages = [];
  socket = io('localhost:3001');

  loginPlayer(name) {
    this.socket.emit('PLAYER_CONNECTION', {
      name
    });
    this.currentUser = name;
  }

  loginPlayerSuccess(callback) {
    this.socket.on('PLAYER_ADDITION', data => {
      callback(data);
    });   
  }

  getCurrentUser(){   
    return this.currentUser;
  }

  getPlayersList(callback){
    this.socket.on('PLAYER_LIST', data => {
      callback(data);
    }); 
  }

  sendCapture(attacker, attacked, successfulAttack){
    this.socket.emit('CAPTURE_ATTEMPT', {
      attacker,
      attacked,
      successfulAttack    
    });
  }

  sendCaptureSuccess(callback){
    this.socket.on('CAPTURE_RESULT', data => {
      callback(data);
  });
  }
}

export const socketService = new SocketService();
