<template>
<b-container fluid>
  <b-row>
    <b-col sm>
      <b-nav vertical class="w-50 text-left bd-sidebar">
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
    <b-col lg="8">
      <b-row>
        <b-col>
          <div>
            <b-jumbotron header="AC Mod Car" lead="A collection of quality mods" class="mb-2 text-left"></b-jumbotron>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <div v-for="car in cars" :key="car.ModelName" class="text-left">
            <b-card :title="car.Brand.Name+' '+car.ModelName" :sub-title="car.Drivetrain+' '+car.GearType" class="mb-2">
              <b-card-text>
                <b-badge v-for="category in car.Categories" :key="category.Name" class="m-1">{{category.Name}}</b-badge>
                <b-badge v-if="car.Premium" class="m-1" variant="warning">Premium</b-badge>
              </b-card-text>
              <b-link :href="car.DownloadLink" class="card-link">Download Here</b-link>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col sm>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name : "car-table",
  data() {
    return {
      cars: [],
      categories: [],
      nations: [],
      serverPath: "https://api.mod.davidebaldelli.it/"
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
        .then(response => {this.cars = response.data})
        .catch(error => console.log(error));
    },
    brandSelected(brand){
      this.axios
        .get(this.serverPath+'car/brand/'+brand)
        .then(response => {this.cars = response.data})
        .catch(error => console.log(error));
    },
    categorySelected(category){
      this.axios
        .get(this.serverPath+'car/category/'+category)
        .then(response => {this.cars = response.data})
        .catch(error => console.log(error));
    },
    loadAll(){
      this.axios
        .get(this.serverPath+'car/all')
        .then(response => {this.cars = response.data})
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped>

</style>
