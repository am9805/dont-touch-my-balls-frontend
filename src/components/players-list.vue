<template>
    <div> 
      <p>PLAYERS</p> 
      <ul>
        <li v-for="player in players"  :key="player.name">{{player.name}}</li>
      </ul>
    </div>
</template>

<script>
import {SocketService} from '../services/socket.service';
export default {
  name: "PlayersList",
  data() {
    return {
      socketService: new SocketService(),
      playersData: Object,
      players: []    
    }    
  },
  methods: {
    getPlayers(){      
      this.socketService.getPlayersList(response => {
        this.players = response['players'];    
      });
    }
  },
  beforeMount(){
    this.getPlayers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
