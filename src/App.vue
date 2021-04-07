<template>
  <div id="app">
    <track-input/>
    <track-table/>
  </div>
</template>

<script>
import TrackTable from "@/components/TrackTable";
import TrackInput from "@/components/TrackInput";

export default {
  name: 'App',
  components: {
    TrackInput,
    TrackTable,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
