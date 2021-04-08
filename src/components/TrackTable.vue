<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(Location)="data">
        {{data.item.Location}}, {{data.item.Nation}}
      </template>
      <template #cell(DownloadLink)="data">
        <b-link :href="data.value">{{data.value}}</b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
name: "TrackTable",
data() {
  return {
    fields: ['Name','Location','DownloadLink'],
    items: null,
  }
},
mounted () {
  this.axios.
  get('http://localhost:6316/track/all').
  then(response => {this.items = response.data; console.log(response.data)}).
  catch(error => console.log(error))
},
}
</script>

<style scoped>

</style>