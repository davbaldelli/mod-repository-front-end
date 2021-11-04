<template>
  <b-container fluid>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col cols="12" md="8" sm="10" xl="6">
        <b-jumbotron
            class="py-3 py-sm-4 py-lg-5 mb-2 text-left"
            header="AC Mod Cars"
            lead="A collection of quality mods"
        ></b-jumbotron>
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col md="8" sm="10" xl="6">
        <b-nav class="px-0" sticky toggleable>
          <b-input-group>
            <b-form-input v-model="model_filter" required v-on:keyup.enter="filterByName"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success" @click="filterByName()"
              >Search
              </b-button
              >
            </b-input-group-append>
          </b-input-group>
          <b-navbar-nav class="ml-auto">
            <b-nav-text class="mx-2" right>filters</b-nav-text>
          </b-navbar-nav>
          <b-navbar-toggle target="navbar-toggle-collapse">
            <template #default="{ expanded }">
              <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
              <b-icon v-else icon="chevron-bar-down"></b-icon>
            </template>
          </b-navbar-toggle>
          <b-collapse id="navbar-toggle-collapse" class="navbar-collapse">
            <b-nav>
              <div v-for="(brands, nation) in nations" :key="nation" class="my-2 mr-2">
                <b-dropdown
                    :text="nation"
                    split
                    @click="nationSelected(nation)"
                >
                  <b-dropdown-item
                      v-for="brand in brands"
                      :key="brand"
                      @click="brandSelected(brand)"
                  >{{ brand }}
                  </b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <b-dropdown class="my-2 mr-2" text="Category" variant="primary">
                <b-dropdown-item
                    v-for="category in categories"
                    :key="category.Name"
                    @click="categorySelected(category.Name)"
                >{{ category.Name }}
                </b-dropdown-item
                >
              </b-dropdown>
              <b-button class="mr-2 my-2" variant="primary" @click="resetFilter"
              >All
              </b-button
              >
            </b-nav>
          </b-collapse>
        </b-nav>
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col md="8" sm="10" xl="6">
        <b-row>
          <b-col v-if="loadingCars" cols="12">
            <b-spinner label="Loading..."></b-spinner>
          </b-col>
          <b-col v-if="!loadingCars" cols="12">
            <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                align="center"
                aria-controls="car-card-list"
            ></b-pagination>
            <div id="car-card-list" class="text-left">
              <b-card
                  v-for="car in carsForList"
                  :key="car.ModelName"
                  class="overflow-hidden mb-2"
                  no-body
              >
                <b-row no-gutters>
                  <b-col class="d-flex align-items-center">
                    <b-card-img
                        :src="car.Image"
                        alt="Fluid image "
                        class="rounded-4 m-1"
                    >>
                    </b-card-img
                    >
                  </b-col>
                  <b-col class="mh-100" md="8">
                    <b-card-body class="p-3 h-100">
                      <b-card-title class="mb-2">
                        <b-link to="#"
                        >{{ car.Brand.Name }} {{ car.ModelName }}
                        </b-link
                        >
                      </b-card-title>
                      <b-card-sub-title class="mb-3 mt-1">
                        <b-badge
                            v-for="category in car.Categories"
                            :key="category.Name"
                            class="mr-1"
                        >{{ category.Name }}
                        </b-badge
                        >
                        <b-badge v-if="car.Premium" variant="warning"
                        >Premium
                        </b-badge
                        >
                      </b-card-sub-title>
                      <b-card-text class="ml-2 mb-1">
                        <b>Year: </b>{{ car.Year }}<br/>
                        <b>Author: </b
                        >
                        <b-link target="_blank" :href="car.Author.Link">{{
                            car.Author.Name
                          }}
                        </b-link>
                        <br/>
                        <b>{{ car.Transmission }}</b
                        >, <b>{{ car.Drivetrain }}</b
                      >, <b>BHP:</b> {{ car.BHP }}, <b>Nm: </b
                      >{{ car.Torque }}, <b>Kg:</b> {{ car.Weight }},
                        <b>Top Speed:</b> {{ car.TopSpeed }}km/h,
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
                <b-card-footer v-if="premium || !car.Premium" class="p-1 text-center">
                  <b-button :href="car.DownloadLink" target="_blank" variant="primary">Download</b-button>
                </b-card-footer>
              </b-card>
            </div>
            <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                align="center"
                aria-controls="car-card-list"
                @change="toTop()"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import {carsFilters} from "@/_helpers";

export default {
  name: "car-list",
  data() {
    return {
      selector: cars => cars,
      currentPage: 1,
      model_filter: "",
      perPage: 25,
    };
  },
  computed: {
    rows() {
      return this.filteredCars.length;
    },
    premium() {
      return this.$store.getters["authentication/isLogged"]
    },
    filteredCars() {
      return this.selector(this.cars)
    },
    carsForList() {
      return this.filteredCars.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage)
    },
    cars() {
      return this.$store.getters["cars/cars"]
    },
    nations() {
      return this.$store.getters['cars/brands'].reduce((r, a) => {
        r[a.Nation] = [...r[a.Nation] || [], a.Name]
        return r
      }, {})
    },
    categories() {
      return this.$store.getters['cars/types']
    },
    loadingCars() {
      return this.$store.getters['cars/loadingCars']
    }
  },
  created() {
    this.$parent.$on('loggedIn', this.initiate)
    this.$parent.$on('loggedOut', this.initiate)
  },
  mounted() {
    this.initiate()
  },
  methods: {
    toTop() {
      document.getElementById("mod-list-title").scrollIntoView();
    },
    nationSelected(nation) {
      this.selector = carsFilters.filterByNation(nation)
    },
    brandSelected(brand) {
      this.selector = carsFilters.filterByBrand(brand)
    },
    categorySelected(category) {
      this.selector = carsFilters.filterByCategory(category)
    },
    filterByName() {
      this.selector = carsFilters.filterByName(this.model_filter)
    },
    resetFilter() {
      this.selector = c => c
    },
    getAllCars() {
      this.$store.dispatch('cars/getAll')
    },
    initiate(){
      this.getAllCars();
      this.$store.dispatch('cars/getCarTypes')
      this.$store.dispatch('cars/getCarBrands')
    }
  },
};
</script>

<style scoped>

</style>