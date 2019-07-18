<template>
  <div>    
    <b-button  v-for="player in players"
          :key="player.name" id="show-btn" class="cbutton" @click="showModal(player.name)">{{player.name}}</b-button>

    <b-modal ref="my-modal" >
      <b-button  v-if="selectedWord == ''" @click="getWord()"  variant="success" >GENERATE WORD</b-button>
      <div  class="d-block text-center" v-if="selectedWord != ''">
         
          <p class="my-4">Write this word "{{selectedWord}}" bellow</p>
          <input v-model="word">
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="checkWord">Verify</b-button>
    </b-modal>
  </div>
</template>

<script>
import {socketService} from '../services/socket.service';

  export default {
    data(){
      return {
        socketService:socketService,
        playersData: Object,
        players: [],
        index:Number,
        word: '',
        playerName: '',
        selectedWord:'',
        match: Boolean,
        words:['parangaricutirimicuaro', 'esternocleidomastoideo', 'otorrinolaringologia', 'donttouchmyballs',
        'supercalifragilisticoespialidoso', 'electroencefalografista', 'uno', 'demogorgon', 'valarmorghulis',
        'valardohaeris', 'dracarys', 'caleidoscopio', 'paralelepipedo', 'antigubernamentalisticamente']    
      }
    },
    methods: {
      getPlayers(){      
      this.socketService.getPlayersList(response => {
        this.players = response['players'];        
      });
    },
      showModal(player) {
        this.playerName = player
        this.$refs['my-modal'].show()
      },
      hideModal() {
        
      },
      checkWord(){
      if(this.word === this.selectedWord){
        let currentUser = this.socketService.getCurrentUser();
        console.log(currentUser);        
        this.socketService.sendCapture(currentUser, this.playerName , true );
        this.selectedWord = '';
        this.match = true;
        this.word='';
        this.$refs['my-modal'].hide()
      }else{
        let currentUser = this.socketService.getCurrentUser();
        this.socketService.sendCapture(currentUser, this.playerName, false );
        console.log('NICE TRY');    
        this.selectedWord = '';    
        this.match = false;
        this.word='';
      }     
    },
    getWord(){
      this.index = Math.floor((Math.random() * this.words.length) + 1);
       this.selectedWord = this.words[this.index]; 
    },
    getCaptureResult(){
      this.socketService.sendCaptureSuccess(response => {
        window.alert(`${this.playerName} perdió ${response['attacked']['lostPoints']} punto!`)          
      });
    },
    },
    beforeMount(){
    this.getPlayers();
    this.getCaptureResult();
  }
}
</script>
<style scoped>
  .cbutton{
    margin: 10px;
  }
  .my-4{
    color: black;
  }
</style>