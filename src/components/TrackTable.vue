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
                <b-form-input v-on:keyup.enter="filterByName" v-model="name_filter" required/>
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
          <b-col v-if="loadingTracks">
            <b-spinner label="Loading..."></b-spinner>
          </b-col>
          <b-col v-if="!loadingTracks">
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
                  <b-button target="_blank" :href="track.DownloadLink" variant="primary"
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
import {tracksFilters} from "@/_helpers/tracks-filters";

export default {
  name: "TrackTable",
  data() {
    return {
      selector: t => t,
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
    loadingTracks() {
      return this.$store.getters["tracks/loadingTracks"]
    },
    rows() {
      return this.filteredCars.length;
    },
    tracksForList() {
      return this.filteredCars.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
      )
    },
    premium() {
      return this.$store.getters["authentication/isLogged"]
    },
    filteredCars() {
      return this.selector(this.tracks)
    },
    tracks() {
      return this.$store.getters['tracks/tracks']
    },
    nations(){
      return this.$store.getters['tracks/nations']
    }
  },
  mounted() {
    this.getAllTracks();
    this.$store.dispatch('tracks/getAllNations')
  },
  created() {
    this.$parent.$on('loggedIn', this.getAllTracks)
    this.$parent.$on('loggedOut', this.getAllTracks)
  },
  methods: {
    nationSelected(nation) {
      this.selector = tracksFilters.filterByNation(nation)
    },
    toTop() {
      document.getElementById("mod-list-title").scrollIntoView();
    },
    categorySelected(category) {
      this.selector = tracksFilters.filterByLayoutCategory(category)
    },
    tagSelected(tag) {
      this.selector = tracksFilters.filterByTag(tag)
    },
    filterByName() {
      this.selector = tracksFilters.filterByName(this.name_filter)
    },
    resetFilter() {
      this.selector = t => t
    },
    getAllTracks() {
      this.$store.dispatch('tracks/getAllTracks')
    },
  },
};
</script>

<style scoped>

</style>
