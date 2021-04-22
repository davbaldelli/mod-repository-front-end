<template>
  <div class="container-fluid">
    <b-row>
      <b-col sm> </b-col>
      <b-col lg="6">
        <b-row>
          <b-col>
            <div id="mod-list-title">
              <b-jumbotron
                header="AC Mod Tracks"
                lead="A collection of quality mods"
                class="mb-2 text-left"
              ></b-jumbotron>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-nav class="text-left">
              <b-dropdown text="Nation" class="m-2">
                <b-dropdown-item
                  v-for="nation in nations"
                  :key="nation.Name"
                  @click="nationSelected(nation.Name)"
                  >{{ nation.Name }}</b-dropdown-item
                >
              </b-dropdown>
              <b-dropdown text="Category" class="m-2">
                <b-dropdown-item
                  v-for="tag in trackTags"
                  :key="tag"
                  @click="tagSelected(tag)"
                  >{{ tag }}</b-dropdown-item
                >
              </b-dropdown>
              <b-dropdown text="Layout Type" class="m-2">
                <b-dropdown-item
                  v-for="type in layoutTypeOptions"
                  :key="type"
                  @click="categorySelected(type)"
                  >{{ type }}</b-dropdown-item
                >
              </b-dropdown>
              <b-button variant="primary" class="m-2" @click="loadAllTracks"
                >All</b-button
              >
              <b-input-group class="m-2">
                <b-form-input v-model="name_filter" required />
                <b-input-group-append>
                  <b-button @click="filterByName()" variant="outline-success"
                    >Search</b-button
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
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="car-card-list"
              align="center"
            ></b-pagination>
            <pre>{{ this.$premium }}</pre>
            <div class="text-left" id="track-card-list">
              <b-card
                v-for="track in tracksForList"
                :key="track.Name"
                no-body
                class="overflow-hidden mb-2"
              >
                <b-row no-gutters>
                  <b-col sm class="d-flex align-items-center">
                    <b-card-img
                      :src="track.Image"
                      alt="Fluid image"
                      class="rounded-2 m-1"
                    ></b-card-img>
                  </b-col>
                  <b-col md="8">
                    <b-card-body class="p-3">
                      <b-card-title><b-link :href="'/track/'+track.Name">{{ track.Name }}</b-link></b-card-title>
                      <b-card-sub-title class="mb-2">
                        <b-badge
                          v-for="tag in track.Tags"
                          :key="tag"
                          class="mr-1"
                          >{{ tag }}</b-badge
                        >
                        <b-badge v-if="track.Premium" variant="warning"
                          >Premium</b-badge
                        ></b-card-sub-title
                      >
                      <b-card-text class="ml-2 mb-1">
                        <b>Location: </b>{{ track.Location }}, {{ track.Nation.Name }}<br/>
                        <b>Author: </b
                        ><b-link :href="track.Author.Link">{{
                          track.Author.Name
                        }}</b-link>
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
                <b-card-footer v-if="!track.Premium || premium" class="text-center p-2">
                  <b-button :href="track.DownloadLink" variant="primary">Download</b-button>
                </b-card-footer>
              </b-card>
            </div>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="car-card-list"
              @change="toTop()"
              align="center"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TrackTable",
  data() {
    return {
      tracks: [],
      nations: [],
      name_filter: "",
      currentPage: 1,
      perPage: 25,
      premium: false,
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
      get tracksForList() {
        return this.tracks.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      },
    };
  },
  computed: {
    rows() {
      return this.tracks.length;
    },
  },
  mounted() {
    this.loadAllTracks();
    this.axios
      .get(this.$serverPath + "nation/track/all")
      .then((res) => (this.nations = res.data));
    if (localStorage.getItem("user") != {}) {
      this.premium =
        JSON.parse(localStorage.getItem("user")).Username == "premium";
    }
  },
  methods: {
    nationSelected(nation) {
      this.axios
        .get(this.$serverPath + "track/nation/" + nation)
        .then((response) => (this.tracks = response.data))
        .catch((error) => console.log(error));
    },
    toTop() {
      document.getElementById("mod-list-title").scrollIntoView();
    },
    categorySelected(category) {
      this.axios
        .get(this.$serverPath + "track/layout/type/" + category)
        .then((response) => (this.tracks = response.data))
        .catch((error) => console.log(error));
    },
    tagSelected(tag) {
      this.axios
        .get(this.$serverPath + "track/tag/" + tag)
        .then((response) => (this.tracks = response.data))
        .catch((error) => console.log(error));
    },
    filterByName() {
      this.axios
        .get(this.$serverPath + "track/find/name/" + this.name_filter)
        .then((response) => (this.tracks = response.data))
        .catch((error) => console.log(error));
    },
    loadAllTracks() {
      this.axios
        .get(this.$serverPath + "track/all")
        .then((response) => (this.tracks = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.bd-sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
  z-index: 1000;
  height: calc(100vh - 4rem);
}
</style>
