<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col lg="6">
          <b-row>
            <b-col>
              <div id="mod-list-title">
                <b-jumbotron
                    header="AC Mod Cars"
                    lead="A collection of quality mods"
                    class="mb-2 text-left"
                ></b-jumbotron>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-nav sticky>
                <div v-for="nation in nations" :key="nation.Nation" class="m-2">
                  <b-dropdown
                      :text="nation.Nation"
                      split
                      @click="nationSelected(nation.Nation)"
                  >
                    <b-dropdown-item
                        v-for="brand in nation.Brands"
                        @click="brandSelected(brand)"
                        :key="brand"
                    >{{ brand }}
                    </b-dropdown-item
                    >
                  </b-dropdown>
                </div>
                <b-dropdown text="Categories" variant="primary" class="m-2">
                  <b-dropdown-item
                      v-for="category in categories"
                      :key="category.Name"
                      @click="categorySelected(category.Name)"
                  >{{ category.Name }}
                  </b-dropdown-item
                  >
                </b-dropdown>
                <b-button variant="primary" class="m-2 mt-2" @click="loadAll"
                >All
                </b-button
                >
                <b-input-group class="m-2">
                  <b-form-input v-model="model_filter" required></b-form-input>
                  <b-input-group-append>
                    <b-button @click="filterByName()" variant="outline-success"
                    >Search
                    </b-button
                    >
                  </b-input-group-append>
                </b-input-group>
                <div style="width: 100%" class="text-left">
                  <b-alert v-model="search_error" class="m-2" dismissible variant="danger">
                    Car not found!
                  </b-alert>
                </div>
              </b-nav>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="car-card-list"
                  align="center"
              ></b-pagination>
              <div id="car-card-list" class="text-left">
                <b-card
                    v-for="car in carsForList"
                    :key="car.ModelName"
                    no-body
                    class="overflow-hidden mb-2"
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
                    <b-col md="8" class="mh-100">
                      <b-card-body class="p-3 h-100">
                        <b-card-title class="mb-2">
                          <b-link :to="'/car/' + car.ModelName"
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
                          <b-link :href="car.Author.Link">{{
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
                    <b-button :href="car.DownloadLink" variant="primary">Download</b-button>
                  </b-card-footer>
                </b-card>
              </div>
              <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="car-card-list"
                  align="center"
                  @change="toTop()"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "car-table",
  data() {
    return {
      search_error : false,
      currentPage: 1,
      cars: [],
      categories: [],
      nations: [],
      model_filter: "",
      perPage: 25,
      premium: false,
      get carsForList() {
        return this.cars.slice(
            (this.currentPage - 1) * this.perPage,
            this.currentPage * this.perPage
        );
      },
    };
  },
  computed: {
    rows() {
      return this.cars.length;
    },
  },
  mounted() {
    this.loadAll();
    this.axios
        .get(this.$serverPath + "car/type/all")
        .then((res) => (this.categories = res.data));
    this.axios
        .get(this.$serverPath + "brand/all/grouped/nation")
        .then((res) => (this.nations = res.data));

    let user = JSON.parse(localStorage.getItem('user'))
    if (user != null) {
      this.premium = user.Username == "premium";
    }
  },
  methods: {
    nationSelected(nation) {
      this.axios
          .get(this.$serverPath + "car/nation/" + nation)
          .then((response) => {
            this.cars = response.data;
          })
          .catch((error) => console.log(error));
    },
    toTop() {
      document.getElementById("mod-list-title").scrollIntoView();
    },
    brandSelected(brand) {
      this.axios
          .get(this.$serverPath + "car/brand/" + brand)
          .then((response) => {
            this.cars = response.data;
          })
          .catch((error) => console.log(error));
    },
    categorySelected(category) {
      this.axios
          .get(this.$serverPath + "car/category/" + category)
          .then((response) => {
            this.cars = response.data;
          })
          .catch((error) => console.log(error));
    },
    filterByName() {
      this.axios
          .get(this.$serverPath + "car/find/model/" + this.model_filter)
          .then((response) => {
            this.cars = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.search_error = true
          });
    },
    loadAll() {
      this.axios
          .get(this.$serverPath + "car/all")
          .then((response) => {
            this.cars = response.data;
          })
          .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
</style>
