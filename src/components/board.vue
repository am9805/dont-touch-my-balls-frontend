<template>
    <div >
      <b-button 
      @click="$bvModal.show('modal-scoped-2')"
      variant="success" 
      class="button-c" 
      v-for="player in players"
      :key="player.name">{{player.name}}
      
      </b-button>
      <b-modal id="modal-scoped-2">
          <b-button  v-if="selectedWord == ''" @click="getWord()"  variant="success" >GENERATE WORD</b-button>
          <div v-if="selectedWord != ''">
            <p class="my-4">Write this word "{{selectedWord}}" bellow</p>
            <input v-model="word">
            <!-- <p v-if="errorMessage" class="my-4">{{errorMessage}}</p> -->
            <b-button size="sm" variant="outline-danger" @click="checkWord(player.name)"> Verify </b-button>
          </div>
          
        </b-modal>
    </div>
</template>

<script>
import {socketService} from '../services/socket.service';

export default {
  name: "Board",
  data() {
    return {
      socketService:socketService,
      playersData: Object,
      players: [],
      index:Number,
      word: '',
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
    checkWord(atackedUser){
      if(this.word === this.selectedWord){
        let currentUser = this.socketService.getCurrentUser();
        console.log(currentUser);        
        this.socketService.sendCapture(currentUser, atackedUser, true );
        this.selectedWord = '';
        this.match = true;
        this.word='';
      }else{
        let currentUser = this.socketService.getCurrentUser();
        this.socketService.sendCapture(currentUser, atackedUser, false );
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
        console.log(response);
          
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

.button-c{
  margin: 10px;
}


.my-4{
  color: black;
}
</style>
