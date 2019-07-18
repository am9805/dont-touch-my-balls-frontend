<template>
  <div>
    <p>SCORE</p>
    <ul>
      <li :key="player.name" v-for="player in playerScoreList" >{{ player.name }} [ {{ player.score }} ]</li>
    </ul>
  </div>
</template>

<script>
import { socketService } from "../services/socket.service";

export default {
  name: "Score",
  props: {
    msg: String
  },
  data() {
    return {
      playerScoreList: [],
      socketService
    };
  },
  methods: {
    getActualScoreList() {
      this.socketService.getPlayersList(response => {
        this.playerScoreList = response.players ? response.players.sort((a, b) => b.score - a.score) : this.playerScoreList;
      });
    }
  },
  mounted() {
    this.getActualScoreList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
