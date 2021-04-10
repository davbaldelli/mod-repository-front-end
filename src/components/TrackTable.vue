<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="1" class="border-right">
        <b-nav vertical align="right" class="w-50 flex-column text-left">
          <b-dropdown text="Nation" class="m-2" >
            <b-dropdown-item v-for="(nation) in nations" :key="nation.Name" @click="nationSelected(nation.Name)">{{nation.Name}}</b-dropdown-item>
          </b-dropdown>
          <b-dropdown text="Category" class="m-2">
            <b-dropdown-item v-for="(category) in categories" :key="category.Name" @click="categorySelected(category.Name)">{{category.Name}}</b-dropdown-item>
          </b-dropdown>
          <b-nav-item @click="loadAllTracks">All</b-nav-item>
        </b-nav>
      </b-col>
      <b-col cols="11">
        <b-table striped hover :items="items" :fields="fields">
          <template #cell(Location)="data">
            {{data.item.Location}}, {{data.item.Nation}}
          </template>
          <template #cell(DownloadLink)="data">
            <b-link :href="data.value">{{data.value}}</b-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
name: "TrackTable",
data() {
  return {
    fields: ['Name','Location','DownloadLink'],
    items: null,
    nations: [],
    categories: [],
  }
},
mounted () {
  this.loadAllTracks()
  this.axios.get('http://localhost:6316/nation/track/all').then(res => this.nations = res.data)
  this.axios.get('http://localhost:6316/layout/type/all').then(res => this.categories = res.data)
},
  methods: {
    nationSelected(nation){
      this.axios.
      get('http://localhost:6316/track/nation/'+nation).
      then(response => {this.items = response.data; console.log(response.data)}).
      catch(error => console.log(error))
    },
    categorySelected(category){
      this.axios.
      get('http://localhost:6316/track/layout/type/'+category).
      then(response => {this.items = response.data; console.log(response.data)}).
      catch(error => console.log(error))
    },
    loadAllTracks(){
      this.axios.
      get('http://localhost:6316/track/all').
      then(response => {this.items = response.data; console.log(response.data)}).
      catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>

</style>
