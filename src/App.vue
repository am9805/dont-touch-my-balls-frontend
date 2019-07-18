<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from './components/main.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
#app {
  font-family: 'Gloria Hallelujah', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10px;
  
  
}
body{
  background: linear-gradient( to right, #FA5C65, #FD9A28);
  color:aliceblue;
}
</style>
