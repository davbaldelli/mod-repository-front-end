<template>
  <div class="container">
    <b-row id="title">
      <b-col>
        <h2 class="mt-4 mb-1">{{ track.Name }}</h2>
        <b-badge
            v-for="tag in track.Tags"
            :key="tag"
            class="mr-1"
        >{{ tag }}
        </b-badge
        >
        <b-badge v-if="track.Premium" variant="warning"
        >Premium
        </b-badge
        >
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-card
            class="overflow-hidden mb-2"
            no-body
        >
          <b-row no-gutters>
            <b-col class="d-flex align-items-center">
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
                    <b>Year: </b>{{ track.Year }}<br/>
                    <b>Location: </b>{{ track.Location }}, {{ track.Nation.Name }}<br/>
                    <b>Author: </b><a :href="track.Author.Link">{{ track.Author.Name }}</a><br/><br/>
                    <b-button v-if="premium || !track.Premium" :href="track.DownloadLink" variant="primary">Download
                    </b-button>
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
        <h4 class="m-4">Layouts</h4>
        <b-card v-for="layout in track.Layouts" :key="layout.Name" :title="layout.Name + ' Layout'" class="text-left">
          <b-card-body>
            <b-card-text>
              <p>
                <b>Length: </b>{{ layout.LengthM }}<br/>
                <b>Type: </b>{{ layout.Category }}<br/>
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
  data() {
    return {
      track: {
        DownloadLink: "",
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
        Author: {
          Name: "",
          Link: ""
        }
      },
      premium: false
    }
  },
  mounted() {
    this.axios
        .get(this.$serverPath + "track/name/" + this.$route.params.name)
        .then((response) => (this.track = response.data))
        .catch((error) => console.log(error));
    let user = JSON.parse(localStorage.getItem('user'))
    if (user != null) {
      this.premium = user.Username == "premium";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>