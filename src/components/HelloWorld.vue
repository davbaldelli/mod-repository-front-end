<template>
  <b-container fluid>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col cols="12" md="8" sm="10" xl="6">
        <b-jumbotron
            class="py-3 py-sm-4 py-lg-5 mb-2 text-left"
            header="AC Mod Repository"
            lead="A collection of quality mods"
        ></b-jumbotron>
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col cols="12" md="8" sm="10" xl="6" class="px-5">
        <h3 class="my-2">
          Benvenuti a tutti.
        </h3>
        <h5>
          Questo sito è una raccolta di mod di qualità, un tentativo di riunire nello stesso punto le migliori macchine e
          piste sparse sul web.<br/>
          Le mod qui presenti sono rimaste inalterate, e, ove possibile, sono presenti i riferimenti ai rispettivi autori.<br/>
        </h5>
        <h5 class="mb-2">
          Se ti piace il nostro lavoro e vorresti premiarci ti invito a fare una piccola donazione
          <a href="https://paypal.me/teamItaliaracing?locale.x=it_IT" target="_blank">qui</a>
        </h5>
        <h5>
          Se invece siete in ricerca di una comunità dove poter girare in compagnia vi invitiamo sul nostro gruppo <a
            href="https://discord.gg/5HTA8xZgTA"
            target="_blank">discord</a>
        </h5>
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col md="3" sm="1" xl="4"></b-col>
      <b-col cols="12" md="6" sm="10" xl="4">
        <h3 class="my-3">Last added cars: </h3>
        <b-spinner v-if="carsFetching"/>
        <b-card
            v-for="(car, index) in cars"
            :key="index"
            class="overflow-hidden mb-2"
            no-body
        >
          <b-row no-gutters>
            <b-col cols="2" class="d-flex align-items-center">
              <b-card-img
                  :src="car.Image"
                  alt="Fluid image "
                  class="rounded-4 m-1"
              >>
              </b-card-img
              >
            </b-col>
            <b-col cols="10" class="mh-100 text-left">
              <b-card-body class="p-3 h-100">
                <b-card-text class="ml-2 h-100 d-flex align-items-center">
                  <b-link :to="`/car/${car.ModelName}`"
                  >{{ car.Brand.Name }} {{ car.ModelName }}
                  </b-link
                  >
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="3" sm="1" xl="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import {carsFilters} from "@/_helpers";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    cars (){
      return carsFilters.lastAdded(10)(this.$store.getters["cars/cars"])
    },
    carsFetching(){
      return this.$store.getters["cars/loadingCars"]
    }
  },
  mounted() {
    this.initiate()
  },
  created() {
    this.$parent.$on('loggedIn', this.initiate)
    this.$parent.$on('loggedOut', this.initiate)
  },
  methods :{
    initiate() {
      this.$store.dispatch('cars/getAll')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
