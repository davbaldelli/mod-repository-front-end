<template>
  <div class="container-fluid">
    <b-row>
      <b-col sm>
        <b-nav vertical class="w-50 text-left bd-sidebar">
          <b-input-group class="m-2">
          <b-form-input v-model="name_filter" required/>
            <b-input-group-append>
              <b-button @click="filterByName()" variant="outline-success">Search</b-button>
            </b-input-group-append>
          </b-input-group>
          <b-dropdown text="Nation" class="m-2" >
            <b-dropdown-item v-for="(nation) in nations" :key="nation.Name" @click="nationSelected(nation.Name)">{{nation.Name}}</b-dropdown-item>
          </b-dropdown>
          <b-nav-item @click="loadAllTracks">All</b-nav-item>
        </b-nav>
      </b-col>
      <b-col lg="6">
        <b-row>
          <b-col>
            <div id="mod-list-title">
              <b-jumbotron header="AC Mod Tracks" lead="A collection of quality mods" class="mb-2 text-left"></b-jumbotron>
            </div>
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
            <div class="text-left" id="track-card-list">
              <b-card  v-for="track in tracksForList" :key="track.Name" no-body class="overflow-hidden mb-2">
              <b-row no-gutters>
                <b-col md="3">
                  <b-card-img :src="track.Image" alt="Fluid image" class="rounded-2"></b-card-img>
                  </b-col>
                  <b-col md="9">
                    <b-card-body>
                      <b-card-title>{{track.Name}}</b-card-title>
                      <b-card-sub-title>{{track.Location}}, {{track.Nation.Name}}</b-card-sub-title>
                      <b-card-text>
                        <b-badge v-for="tag in track.Tags" :key="tag" class="mr-1 mt-3">{{tag}}</b-badge>
                        <b-badge v-if="track.Premium" variant="warning">Premium</b-badge>
                      </b-card-text>
                      <b-link :href="track.DownloadLink" class="card-link">Download Here</b-link>
                    </b-card-body>                  
                  </b-col>
                </b-row>
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
    serverPath: "https://api.mod.davidebaldelli.it/",
    name_filter : "",
    currentPage : 1,
    perPage : 25,
    get tracksForList() {
      return this.tracks.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    }
  }
},
computed : {
  rows () {
    return this.tracks.length
  },
  
},
mounted () {
  this.loadAllTracks()
  this.axios.get(this.serverPath+'nation/track/all').then(res => this.nations = res.data)
},
  methods: {
    nationSelected(nation){
      this.axios.
      get(this.serverPath+'track/nation/'+nation).
      then(response => this.tracks = response.data).
      catch(error => console.log(error))
    },
    toTop() {
      document.getElementById('mod-list-title').scrollIntoView();
    },
    categorySelected(category){
      this.axios.
      get(this.serverPath+'track/layout/type/'+category).
      then(response => this.tracks = response.data).
      catch(error => console.log(error))
    },
    filterByName(){
      this.axios.
      get(this.serverPath+'track/name/'+this.name_filter).
      then(response => this.tracks = response.data).
      catch(error => console.log(error))
    },
    loadAllTracks(){
      this.axios.
      get(this.serverPath+'track/all').
      then(response => this.tracks = response.data).
      catch(error => console.log(error))
    }
  }
}
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
