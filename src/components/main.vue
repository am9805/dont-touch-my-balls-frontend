<template>
  <div class="container">
    <div class="header">
      <h1>DON'T TOUCH MY BALLS</h1>
    </div>
    <div class="main">
      <div class="players"><PlayersList/></div>
      <div class="board"><Board/></div>
      <div class="score"><Score/></div>
      <div class="logs"><Logs/></div>  
    
    </div>
  </div>
</template>

<script>
import Board from './board';
import Score from './score';
import Logs from './logs';
import PlayersList from './players-list';
export default {
  name: "Main",
  props: {
    msg: String
  },
   components: {
     Board,
     Score,
     Logs,
     PlayersList    
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

.container{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 5% 90% 5% ;
  grid-template-rows:  5% 20% 10% 60% 5%;
  
}

.header{
grid-row: 1;
grid-column: 2;
}

.main{
  display: grid;
  grid-template-columns: 5% 20% 5% 40% 5% 20% 5%;
  grid-template-rows:  5% 50% 5% 35% 5%;
  grid-column: 2;
  grid-row: 3;
}

.players{
  grid-column: 2;
  grid-row-start: 1;
  grid-row-end: 6;
}

.board{
  grid-column: 4;

}

.score{
  grid-column: 6;
  grid-row-start: 1;
  grid-row-end: 6;

}

.logs{
  grid-column: 4;
  grid-row-start: 5;

}

.players, .board, .score, .logs, .main{
  
  padding: 10px;
  border: 1px solid #E55812;
  border-radius: 7px;

}
</style>
