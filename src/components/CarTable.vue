<template>
<b-container class="bgColor">
  <b-row>
     <!-- MENU RICERCA -->
    <b-row>
      <b-navbar class="fixed-top menuFiltri bg-dark">
        <b-input-group class="m-2">
            <b-form-input v-model="model_filter" required></b-form-input>
            <b-input-group-append>
              <b-button @click="filterByName()" variant="outline-success">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        <div v-for="(nation) in nations" :key="nation.Nation" class="m-2">         
            <b-dropdown :text="nation.Nation" split @click="nationSelected(nation.Nation)">
              <b-dropdown-item v-for="(brand) in nation.Brands" @click="brandSelected(brand)" :key="brand">{{brand}}</b-dropdown-item>
            </b-dropdown>
        </div>
        <b-dropdown text="Categories" variant="primary" class="m-2">
          <b-dropdown-item  v-for="(category) in categories" :key="category.Name" @click="categorySelected(category.Name)">{{category.Name}}</b-dropdown-item>
        </b-dropdown>
        <b-nav-item @click="loadAll">All</b-nav-item>
      </b-navbar>
    </b-row>

    <!-- TITOLO -->
    <b-row class="titoloMenu">
      <b-col md='12'>
        <div>
          <b-jumbotron header="AC Mod Car" lead="A collection of quality mods" class="mb-2 text-center"></b-jumbotron>
        </div>
      </b-col>
    </b-row>

          <!--
          <div v-for="car in cars" :key="car.ModelName" class="text-left">
            <b-card no-body class="overflow-hidden mb-2">
              <b-row no-gutters>
                <b-col sm>
                  <b-card-img :src="car.Image" alt="Image " class="rounded-0">></b-card-img>
                </b-col>
                <b-col md="9">
                  <b-card-body>
                    <b-card-title>{{car.Brand.Name}} {{car.ModelName}}</b-card-title>
                    <b-card-sub-title>{{car.Drivetrain}} {{car.Drivetrain}}</b-card-sub-title>
                    <b-card-text>
                      <b-badge v-for="category in car.Categories" :key="category.Name" class="m-1">{{category.Name}}</b-badge>
                      <b-badge v-if="car.Premium" class="m-1" variant="warning">Premium</b-badge>
                    </b-card-text>
                    <b-link :href="car.DownloadLink" class="card-link">Download Here</b-link>
                  </b-card-body>                  
                </b-col>
              </b-row>
            </b-card>
          </div> -->

        <!-- LISTA MACCHINE -->
      <b-row class="carGrid">
            <b-col md='4' v-for="car in cars" :key="car.ModelName">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front carCard">
                    <img :src="car.Image" alt="Image">
                  </div>
                  <div class="flip-card-back">
                    <b-card-title>{{car.Brand.Name}} {{car.ModelName}}</b-card-title>
                    <b-card-sub-title>Trazione: {{car.Drivetrain}}</b-card-sub-title>
                    <b-card-text>
                      <b-badge v-for="category in car.Categories" :key="category.Name" class="m-1">{{category.Name}}</b-badge>
                      <b-badge v-if="car.Premium" class="m-1" variant="warning">Premium</b-badge>
                    </b-card-text>
                    <b-link :href="car.DownloadLink" class="card-link">Download Here</b-link>
                  </div>
                </div>
              </div>
            </b-col>
      </b-row>

    
    <!--<b-col sm>
    </b-col> -->

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
      serverPath: "https://api.mod.davidebaldelli.it/",
      model_filter : ""
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
    filterByName(){
      this.axios
        .get(this.serverPath+'car/model/'+this.model_filter)
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
  .bd-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 4rem;
    z-index: 1000;
    height: calc(100vh - 4rem);
  }

  .flip-card {
  background-color: transparent;
  width: 560px;
  height: 280px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  border-radius: 15px;
  margin-bottom: 25px;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  border-radius: 15px;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 15px;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: #2c3e50;
  color: white;
  transform: rotateY(180deg);
}

.carCard img{
  width: 100%;
  height: 100%;
  background-size: contain;  
  border-radius: 15px;
}


.menuFiltri{
  top: 50px
}
.titoloMenu{
  display: contents;
}

.container {
  max-width: 100%;
}

.row {
  margin-right: 0%;
  margin-left: 0%;
}

.carGrid {
  margin-right: 10px;
  margin-left: 10px;
}

.card-title{
  margin-top: 20px;
}

.card-link{
  color: #FFFF00;
}

.bgColor{
  background-color: #708090;
}
</style>
