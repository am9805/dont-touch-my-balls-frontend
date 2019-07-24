<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1>DON'T TOUCH MY BALLS</h1>
          <div class="container" v-if="!isLoged">
            <div class="row">
              <b-button class="col" @click="$bvModal.show('modal-scoped')">LOGIN</b-button>
            </div>
            <div class="row">
              <img  class="col-7 img-home" src="https://media.giphy.com/media/l1J9u3TZfpmeDLkD6/source.gif" />
            </div>
            <b-modal id="modal-scoped">
              <p class="my-4">Player Username!</p>
              <input v-model="msg" />
              <p v-if="errorMessage" class="my-4">{{errorMessage}}</p>
              <b-button size="sm" variant="outline-danger" @click="okModal()">OK</b-button>
            </b-modal>
          </div>
        </div>
      </div>
      <div class="row" v-if="isLoged">
        <div class="col">
          <img class="img-tittle"  src="https://media.giphy.com/media/1US8hT1k0j7SxeKke4/source.gif" alt="">
        </div>
        <div class="col">
          <PlayersList class="players" />
        </div>
        <div class="col-4">
          <Board class="board" />
        </div>
        <div class="col">
          <Score class="score" />
        </div>
        <div class="col">
          <img class="img-tittle"  src="https://media.giphy.com/media/1zi2PKrEjKaHgCqraa/source.gif" alt="">
        </div>
      </div>
      <div class="row" v-if="isLoged">
        <div class="col">
          <Logs class="logs" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./board";
import Score from "./score";
import Logs from "./logs";
import PlayersList from "./players-list";
import { socketService } from "../services/socket.service";
export default {
  name: "Main",
  data() {
    return {
      msg: "",
      socketService: socketService,
      isLoged: false,
      playerData: Object,
      errorMessage: ""
    };
  },
  components: {
    Board,
    Score,
    Logs,
    PlayersList
  },
  methods: {
    okModal() {
      this.socketService.loginPlayer(this.msg);
      this.msg = "";
    },
    getLoginInfo() {
      this.socketService.loginPlayerSuccess(response => {
        this.isLoged = response["connected"];
        if (this.isLoged == false) {
          this.errorMessage = response["error"]["message"];
        }
      });
    }
  },
  mounted() {
    this.getLoginInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col,
.col-4, .col-7{
  padding: 10px;
  border: 1px solid #f4f6f6;
  border-radius: 7px;
}
.img-home{
     margin-left: 20%;
   
}
.img-tittle{
  width: 200px;
  margin-left: 10%;
}
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

.my-4 {
  color: black;
}


</style>
