<template>
  <b-container fluid>
    <b-row v-if="this.$store.getters['cars/loadingCars']">
      <b-col class="mh-100 my-5 align-middle">
        <b-spinner></b-spinner>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="0" md="3" sm="2" xl="4"></b-col>
      <b-col cols="12" md="6" sm="8" xl="4">
        <b-row>
          <b-col cols="12">
            <b-img :src="this.car.Image" rounded fluid-grow alt="car image"></b-img>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="text-left p-3">
              <b-card no-body header-tag="header" class="my-card">
                <template class="pl-2" #header>
                  <div>
                    <h1 class="mb-0">{{car.Brand.Name+" "+car.ModelName}}</h1><b/>
                    <b-badge
                        v-for="category in car.Categories"
                        :key="category.Name"
                        class="ml-1"
                    >{{ category.Name }}
                    </b-badge
                    >
                    <b-badge class="ml-1" v-if="car.Premium" variant="warning"
                    >Premium
                    </b-badge
                    >
                  </div>
                </template>
                <b-list-group flush>
                  <b-list-group-item>
                    <strong>Model Name</strong> : {{this.car.ModelName}}
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Brand</strong> : {{this.car.Brand.Name}}
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Nation</strong> : {{this.car.Brand.Nation.Name}}
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Year</strong> : {{this.car.Year}}
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Transmission</strong> : {{this.car.Transmission}}
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Drivetrain</strong> : {{this.car.Drivetrain}}
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Power</strong> : {{this.car.BHP}} BHP
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Torque</strong> : {{this.car.Torque}} N/m
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Weight</strong> : {{this.car.Weight}} Kg
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Max Speed</strong> : {{this.car.TopSpeed}} Km/h
                  </b-list-group-item>
                  <b-list-group-item>
                    <strong>Author</strong> : <b-link target="_blank" :href="this.car.Author.Link">{{this.car.Author.Name}}</b-link>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="p-3">
            <b-button  :href="this.car.DownloadLink" target="_blank" variant="primary" block>Download</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="0" md="3" sm="2" xl="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "car_detail_test",
  data() {
    return {
      car: {
        Torque: 0,
        BHP: 0,
        Weight: 0,
        TopSpeed: 0,
        DownloadLink: "",
        Image: "",
        ModelName: "",
        Author: {
          Name: "",
          Link: "",
        },
        Brand: {
          Name: "",
          Nation: {
            Name: "",
          },
        },
        Year: 0,
        Drivetrain: "",
        Transmission: "",
        Categories: [
          {
            Name: "",
          },
        ],
        Premium: false,
      },
    };
  },
  computed : {
    premium () {
      return this.$store.getters["authentication/isLogged"]
    },
  },
  async mounted() {
    await this.$store.dispatch("cars/getAll")
    this.car = this.$store.getters["cars/getCarByModel"](this.$route.params.model)
  },
}
</script>

<style scoped>
  .my-card /deep/ header {
    padding-left:0.5rem !important;
  }

</style>