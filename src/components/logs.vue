<template>
  <div>
    <p>LOGS</p>
    <ul id="example-1">
      <li :key="log.key" v-for="log in logs">{{ log.message }}</li>
    </ul>
  </div>
</template>

<script>
import { socketService } from '../services/socket.service';

export default {
  name: "Logs",
  data() {
    return {
      socketService,
      logs: [{ key: 0, message: "Log" }]
    };
  },
  props: {
    msg: String
  },
  methods: {
    getEventLog() {
      this.socketService.getEventLogs(response => {
        const logObject = { ...response, key: this.logs.length };
        this.logs.push(logObject);
      });
    }
  },
  mounted() {
    this.getEventLog();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
