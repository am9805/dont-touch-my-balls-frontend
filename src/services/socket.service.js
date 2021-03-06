import io from 'socket.io-client';

export class SocketService {
  constructor() {}

  currentUser='';
  data;
  messages = [];
  socket = io('ws://sleepy-gorge-94805.herokuapp.com/');

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

  getEventLogs(callback) {
    this.socket.on('LOG_INFO', data => {
      callback(data);
    });
  }

  getPlayersList(callback){
    this.socket.on('PLAYER_LIST', data => {       
      // console.log('DATA',data);     
      callback(data);
    }); 
  }

  getScoreList(callback) {
    this.socket.on('PLAYER_UPDATE_SCORE', data => {
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
