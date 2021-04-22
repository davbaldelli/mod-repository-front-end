<template>
  <div class="container">
    <b-row id="title" class="mb-3">
      <b-col>
        <h1 class="mt-4 mb-1">{{ car.ModelName }}</h1>
        <b-badge v-for="cat in car.Categories" :key="cat.Name" class="mr-1">{{
          cat.Name
        }}</b-badge>
        <b-badge v-if="car.Premium" variant="warning">Premium</b-badge>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card
          no-body
          class="overflow-hidden mb-2 text-left"
        >
          <b-row no-gutters>
            <b-col sm class="d-flex align-items-center">
              <b-card-img
                :src="car.Image"
                alt="Fluid image "
                class="rounded-4 m-1"
                >></b-card-img
              >
            </b-col>
            <b-col md="4" style="height: calc(100%)">
              <b-card-body class="p-3">
                <b-card-text>
                  <p>
                    <b>Transmission: </b>{{ car.Transmission }}<br/>
                    <b>Drivetrain: </b>{{ car.Drivetrain }}<br/> 
                    <b>BHP: </b>{{ car.BHP }}<br/> 
                    <b>Toruqe: </b>{{ car.Torque }}Nn<br/>
                    <b>Weight: </b> {{ car.Weight }}Kg<br/>
                    <b>Top Speed :</b>{{ car.TopSpeed }}Km/h<br/>
                    <b>Author: </b><b-link :href="car.Author.Link">{{car.Author.Name}}</b-link><br/><br/>
                    <b-link v-if="premium || !car.Premium" :href="car.DownloadLink">Download Here</b-link
                >
                  </p>
                </b-card-text>
                <b-card-text class="align-bottom">
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "CarDetail",
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
      premium : false
    };
  },
  mounted() {
    this.axios
      .get(this.$serverPath + "car/model/" + this.$route.params.model)
      .then((response) => (this.car = response.data))
      .catch((error) => console.log(error));
    if(localStorage.getItem('user').Username != null){
      this.premium = JSON.parse(localStorage.getItem('user')).Username == "premium"
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
