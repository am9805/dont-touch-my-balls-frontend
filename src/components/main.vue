<template>
  <div class="container">
    <div class="header">
      <h1>DON'T TOUCH MY BALLS</h1>
      <div>
        <b-button @click="$bvModal.show('modal-scoped')">Open Modal</b-button>
        <b-modal id="modal-scoped">
          <p class="my-4">Player Username!</p>
          <input v-model="msg">
          <b-button size="sm" variant="outline-danger" @click="okModal()" modal-ok> OK </b-button>
        </b-modal>
      </div>
    </div>
    <div class="main">
      <PlayersList class="players" />
      <Board class="board" />
      <Score class="score" />
      <Logs class="logs" />
    </div>
  </div>
</template>

<script>
import Board from "./board";
import Score from "./score";
import Logs from "./logs";
import PlayersList from "./players-list";
import {SocketService} from '../services/socket.service';
export default {
  name: "Main",
  data() {
    return {
      msg: '',
      socketService: new SocketService()
      
      
    }    
  },
  components: {
    Board,
    Score,
    Logs,
    PlayersList
  },
  methods: {
    okModal(){
      this.socketService.loginPlayer(this.msg)      
    },
    getSocket(){
      this.socketService.loginPlayerSuccess();
    }
  },
  mounted(){
    this.getSocket();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.my-4{
  color: black;
}
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 5% 90% 5%;
  grid-template-rows: 5% 20% 10% 60% 5%;
}

.header {
  grid-row: 1;
  grid-column: 2;
}

.main {
  display: grid;
  grid-template-columns: 5% 20% 5% 40% 5% 20% 5%;
  grid-template-rows: 5% 50% 5% 35% 5%;
  grid-column: 2;
  grid-row: 3;
}

.players {
  grid-column: 2;
  grid-row-start: 1;
  grid-row-end: 5;
}

.board {
  grid-column: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

.score {
  grid-column: 6;
  grid-row-start: 1;
  grid-row-end: 5;
}

.logs {
  grid-column: 4;
  grid-row-start: 4;
}

.players,
.board,
.score,
.logs,
.main {
  padding: 10px;
  border: 1px solid #e55812;
  border-radius: 7px;
}
</style>
