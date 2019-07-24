<template>
  <div>
    <h1>BOARD</h1>
    <b-button
      v-for="player in players"
      :key="player.name"
      id="show-btn"
      class="cbutton"
      @click="showModal(player.name)"
    >{{player.name}}</b-button>

    <b-modal ref="my-modal">
      <b-button v-if="selectedWord == ''" @click="getWord()" variant="success">GENERATE WORD</b-button>
      <div class="d-block text-center" v-if="selectedWord != ''">
        <p class="my-4">Write this word "{{selectedWord}}" bellow</p>
        <input v-model="word" />
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="checkWord">Verify</b-button>
    </b-modal>
  </div>
</template>

<script>
import { socketService } from "../services/socket.service";

export default {
  data() {
    return {
      socketService: socketService,
      playersData: Object,
      players: [],
      index: Number,
      word: "",
      playerName: "",
      selectedWord: "",
      x: 0,
      match: Boolean,
      words: [
        "parangaricutirimicuaro",
        "esternocleidomastoideo",
        "otorrinolaringologia",
        "donttouchmyballs",
        "supercalifragilisticoespialidoso",
        "electroencefalografista",
        "uno",
        "demogorgon",
        "valarmorghulis",
        "valardohaeris",
        "dracarys",
        "caleidoscopio",
        "paralelepipedo",
        "antigubernamentalisticamente"
      ],
      currentUser: socketService.getCurrentUser()
    };
  },
  methods: {
    getPlayers() {
      this.socketService.getPlayersList(response => {
        this.players = response["players"];
      });
    },
    showModal(player) {
      let user  = this.socketService.getCurrentUser();
      if (player !== user) {
        this.playerName = player;
        this.$refs["my-modal"].show();
        this.x = 0;
      }else{
        window.alert(
            'NO TE ATAQUES!'
          );
      }

    },
    checkWord() {
      let user  = this.socketService.getCurrentUser();
      if (this.word === this.selectedWord && this.word != "") {
        this.socketService.sendCapture(user, this.playerName, true);
        this.selectedWord = "";
        this.match = true;
        this.word = "";
        this.$refs["my-modal"].hide();
      } else {
        this.socketService.sendCapture(
          user,
          this.playerName,
          false
        );
        this.selectedWord = "";
        this.match = false;
        this.word = "";
      }
      console.log(this.currentUser);
    },
    getWord() {
      this.index = Math.floor(Math.random() * this.words.length + 1);
      this.selectedWord = this.words[this.index];
    },
    getCaptureResult() {
      this.socketService.sendCaptureSuccess(response => {
        if (this.x == 0) {
          window.alert(
            `${this.playerName} perdió ${
              response["attacked"]["lostPoints"]
            } punto!`
          );
        }
      });
    }
  },
  beforeMount() {
    this.getPlayers();
    this.getCaptureResult();
  }
};
</script>
<style scoped>
.cbutton {
  margin: 10px;
}
.my-4 {
  color: black;
}
</style>