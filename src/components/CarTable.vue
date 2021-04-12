<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="1" class="border-right">
        <b-nav vertical align="left" class="w-50 flex-column text-left">
          <div v-for="(nation) in nations" :key="nation.Nation" class="m-2">
              <b-dropdown :text="nation.Nation" split @click="nationSelected(nation.Nation)">
                <b-dropdown-item v-for="(brand) in nation.Brands" @click="brandSelected(brand)" :key="brand">{{brand}}</b-dropdown-item>
              </b-dropdown>
          </div>
          <b-dropdown text="Categories" variant="primary" class="m-2">
            <b-dropdown-item  v-for="(category) in categories" :key="category.Name" @click="categorySelected(category.Name)">{{category.Name}}</b-dropdown-item>
          </b-dropdown>
          <b-nav-item @click="loadAll">All</b-nav-item>
        </b-nav>
      </b-col>
      <b-col cols="11">
        <b-table striped hover :items="items" :fields="fields">
          <template #cell(DownloadLink)="data">
            <a  :href="data.value" >{{data.value}}</a>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name : "car-table",
  data() {
    return {
      fields: ['Model','Brand','DownloadLink'],
      items: [],
      categories: [],
      nations: [],
      serverPath: "https://api.mods.davidebaldelli.it"
    }
  },
  mounted () {
    this.loadAll()
    this.axios.get(this.serverPath+'car/type/all').then(res => this.categories = res.data)
    this.axios.get(this.serverPath+'brand/all/grouped/nation').then(res => this.nations = res.data)
  },
  methods : {
    nationSelected(nation){
      this.axios
        .get(this.serverPath+'car/nation/'+nation)
        .then(response => {this.items = response.data})
        .catch(error => console.log(error));
    },
    brandSelected(brand){
      this.axios
        .get(this.serverPath+'car/brand/'+brand)
        .then(response => {this.items = response.data})
        .catch(error => console.log(error));
    },
    categorySelected(category){
      this.axios
        .get(this.serverPath+'car/category/'+category)
        .then(response => {this.items = response.data})
        .catch(error => console.log(error));
    },
    loadAll(){
      this.axios
        .get(this.serverPath+'car/all')
        .then(response => {this.items = response.data})
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped>

</style>
