<template>
  <div id="app">
    <track-input/>
    <track-table/>
  </div>
</template>

<script>
import TrackInput from "@/components/TrackInput";
import TrackTable from "@/components/TrackTable";

export default {
  name: 'App',
  components: {
    TrackTable,
    TrackInput,
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
