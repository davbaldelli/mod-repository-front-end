<template>
  <div class="container-fluid">
    <b-row>
      <b-col></b-col>
      <b-col lg="6">
        <b-row>
          <b-col>
            <div id="mod-list-title">
              <b-jumbotron
                  class="mb-2 text-left"
                  header="AC Mod Tracks"
                  lead="A collection of quality mods"
              ></b-jumbotron>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-nav class="text-left">
              <b-dropdown class="m-2" text="Nation">
                <b-dropdown-item
                    v-for="nation in nations"
                    :key="nation.Name"
                    @click="nationSelected(nation.Name)"
                >{{ nation.Name }}
                </b-dropdown-item
                >
              </b-dropdown>
              <b-dropdown class="m-2" text="Category">
                <b-dropdown-item
                    v-for="tag in trackTags"
                    :key="tag"
                    @click="tagSelected(tag)"
                >{{ tag }}
                </b-dropdown-item
                >
              </b-dropdown>
              <b-dropdown class="m-2" text="Layout Type">
                <b-dropdown-item
                    v-for="type in layoutTypeOptions"
                    :key="type"
                    @click="categorySelected(type)"
                >{{ type }}
                </b-dropdown-item
                >
              </b-dropdown>
              <b-button class="m-2" variant="primary" @click="resetFilter"
              >All
              </b-button
              >
              <b-input-group class="m-2">
                <b-form-input v-model="name_filter" required/>
                <b-input-group-append>
                  <b-button variant="outline-success" @click="filterByName()"
                  >Search
                  </b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-nav>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                align="center"
                aria-controls="car-card-list"
            ></b-pagination>
            <div id="track-card-list" class="text-left">
              <b-card
                  v-for="track in tracksForList"
                  :key="track.Name"
                  class="overflow-hidden mb-2"
                  no-body
              >
                <b-row no-gutters>
                  <b-col class="d-flex align-items-center">
                    <b-card-img
                        :src="track.Image"
                        alt="Fluid image"
                        class="rounded-2 m-1"
                    ></b-card-img>
                  </b-col>
                  <b-col md="8">
                    <b-card-body class="p-3">
                      <b-card-title
                      >
                        <b-link :href="'/track/' + track.Name">{{
                            track.Name
                          }}
                        </b-link>
                      </b-card-title
                      >
                      <b-card-sub-title class="mb-2">
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
                      </b-card-sub-title
                      >
                      <b-card-text class="ml-2 mb-1">
                        <b>Location: </b>{{ track.Location }},
                        {{ track.Nation.Name }}<br/>
                        <b>Author: </b
                        >
                        <b-link :href="track.Author.Link">{{
                            track.Author.Name
                          }}
                        </b-link>
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
                <b-card-footer
                    v-if="!track.Premium || premium"
                    class="text-center p-2"
                >
                  <b-button :href="track.DownloadLink" variant="primary"
                  >Download
                  </b-button
                  >
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
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TrackTable",
  data() {
    return {
      selector : t => t,
      tracks: [],
      nations: [],
      name_filter: "",
      currentPage: 1,
      perPage: 25,
      layoutTypeOptions: ["Oval", "Road Course", "A to B"],
      trackTags: [
        "F1",
        "NASCAR",
        "Historic",
        "Rally",
        "Drift",
        "Open World",
        "City Track",
        "Touge",
        "Endurance",
        "Street Track",
        "Fictional",
        "Karting",
      ],
    };
  },
  computed: {
    rows() {
      return this.tracks.length;
    },
    tracksForList() {
      return this.selector(this.tracks).slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
      )
    },
    premium() {
      return this.$store.getters["authentication/isLogged"]
    }
  },
  mounted() {
    this.getAllTracks();
    this.axios
        .get(this.$serverPath + "nation/track/all")
        .then((res) => (this.nations = res.data))
        .catch(error => console.log(error));
  },
  created() {
    this.$parent.$on('loggedIn', this.getAllTracks)
    this.$parent.$on('loggedOut',this.getAllTracks)
  },
  methods: {
    nationSelected(nation) {
      this.selector = tracks => {
        let fTracks = []
        tracks.forEach( track =>{
          if(track.Nation.Name === nation){
            fTracks.push(track)
          }
        })
        return fTracks
      }
    },
    toTop() {
      document.getElementById("mod-list-title").scrollIntoView();
    },
    categorySelected(category) {
      this.selector = tracks => {
        let fTracks = []
        tracks.forEach( track =>{
          if(track.Layouts){
            if(track.Layouts.some(e => e.Category === category)){
              fTracks.push(track)
            }
          }

        })
        return fTracks
      }
    },
    tagSelected(tag) {
      this.selector = tracks => {
        let fTracks = []
        tracks.forEach( track =>{
          if(track.Tags){
            if(track.Tags.some(e => e === tag)){
              fTracks.push(track)
            }
          }

        })
        return fTracks
      }
    },
    filterByName() {
      this.axios
          .get(this.$serverPath + "track/find/name/" + this.name_filter)
          .then((response) => (this.tracks = response.data))
          .catch((error) => {
            console.log(error);
            this.search_error = true
          });
    },
    resetFilter(){
      this.selector = t =>t
    },
    getAllTracks() {
      this.axios
          .get(this.$serverPath + "track/all")
          .then((response) => (this.tracks = response.data))
          .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>

</style>
