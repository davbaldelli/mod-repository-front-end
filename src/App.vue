<template>
  <div id="app">
    <car-input/>
    <car-table/>
    <track-table/>
  </div>
</template>

<script>
import CarTable from "@/components/CarTable";
import TrackTable from "@/components/TrackTable";
import CarInput from "@/components/CarInput";

export default {
  name: 'App',
  components: {
    CarInput,
    TrackTable,
    CarTable,
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
