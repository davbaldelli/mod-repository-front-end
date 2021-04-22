<template>
  <div class="container">
    <b-row id="title">
      <b-col>
        <h2 class="mt-4 mb-1">{{track.Name}}</h2>
        <b-badge
        v-for="tag in track.Tags"
        :key="tag"
        class="mr-1"
        >{{ tag }}</b-badge
      >
      <b-badge v-if="track.Premium" variant="warning"
        >Premium</b-badge
      >
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
      <b-card
          no-body
          class="overflow-hidden mb-2"
        >
          <b-row no-gutters>
            <b-col sm class="d-flex align-items-center">
              <b-card-img
                :src="track.Image"
                alt="Fluid image"
                class="rounded-2"
              ></b-card-img>
            </b-col>
            <b-col md="8">
              <b-card-body>
                <b-card-text>
                  <p class="text-left">
                    <b>Year: </b>{{track.Year}}<br/>
                    <b>Location: </b>{{track.Location}}, {{track.Nation.Name}}<br/>
                    <b>Author: </b><a :href="track.Author.Link">{{track.Author.Name}}</a> <br/> 
                    <b class="mt-1">Link: </b><a :href="track.DownloadLink">{{track.DownloadLink}}</a>  
                  </p>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card v-for="layout in track.Layouts" :key="layout.Name" :title="layout.Name + ' Layout'" class="text-left">
          <b-card-body>
            <b-card-text>
              <p>
                <b>Lenght: </b>{{layout.LengthM}}<br/>
                <b>Type: </b>{{layout.Category}}<br/>
              </p>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'TrackDetail',
  data () {
    return {
      track : {DownloadLink: "",
        Image: "",
        Name: "",
        Location: "",
        Year: 0,
        Nation: {
          Name: "",
        },
        Premium: false,
        Layouts: [
          {
            LengthM: 0,
            Category: "",
            Name: "",
          },
        ],
        Author : {
          Name : "",
          Link : ""
        }
      }
    }
  },
  mounted () {
    this.axios
        .get(this.$serverPath + "track/name/" + this.$route.params.name)
        .then((response) => (this.track = response.data))
        .catch((error) => console.log(error));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>