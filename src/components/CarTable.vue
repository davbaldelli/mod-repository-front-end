<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(DownloadLink)="data">
        <a  :href="data.value" >{{data.value}}</a>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name : "car-table",
  data() {
    return {
      fields: ['Model','Brand','DownloadLink'],
      items: null,
    }
  },
  mounted () {
    this.axios.
      get('http://localhost:6316/car/all').
      then(response => this.items = response.data).
      catch(error => console.log(error))
  },
}
</script>

<style scoped>

</style>