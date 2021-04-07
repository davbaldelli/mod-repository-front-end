<template>
  <div>
    <b-form @submit.prevent="onSubmit()">
      <b-form-group
          id="input-group-0"
          label="Download Link:"
          label-for="input-0"
          descripiton="Enter download link"
      >
        <b-form-input
            id="input-0"
            v-model="form.DownloadLink"
            type="url"
            placeholder="Enter download link"
            required
        ></b-form-input>
      </b-form-group>
    <b-form-group
        id="input-group-1"
        label="Track Name:"
        label-for="input-1"
        descripiton="Enter track name"
    >
      <b-form-input
          id="input-1"
          v-model="form.Name"
          placeholder="Enter track name"
          required
      ></b-form-input>
    </b-form-group>
    <b-form-group
        id="input-group-2"
        label="Track Location:"
        label-for="input-2"
        descripiton="Enter track location"
    >
      <b-form-input
          id="input-2"
          v-model="form.Location.LocationName"
          placeholder="Enter track location"
          required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="Nation:"
      label-for="input-3"
    >
      <b-form-select
          id="input-3"
          v-if="existingNation"
          v-model="form.Location.Nation.Name"
          :options="nationOptions"
          class="mb-3"/>
      <b-form-input
          id="input-3"
          v-if="!existingNation"
          v-model="form.Location.Nation.Name"
          placeholder="Enter nation"
          required
      />
    </b-form-group>
    <b-form-checkbox v-model="existingNation" name="check-button-nation" switch>Existing Nation</b-form-checkbox>
    <b-form-group
        id="form-layouts-group"
        label="Enter categories"
    >
      <div v-for="(layout, index) in form.Layouts" v-bind:key="layout.name">
        <b-form-input
            v-model="form.Layouts[index].Name"
            id="input-layout-name"
        ></b-form-input>
        <b-form-input
            v-model="form.Layouts[index].LengthKm"
            type="number"
            id="input-layout-length"
        ></b-form-input>
        <b-form-select
            id="input-layout-Type"
            v-model="form.Layouts[index].Type"
            :options="layoutTypeOptions"
            class="mb-3"/>
      </div>
      </b-form-group>
      <b-button @click="addLayout">Add Layout</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>

</template>

<script>
export default {
  name: "TrackInput",
  data(){
    return{
      form : {
        DownloadLink: "",
        Name : "",
        Location : {
          LocationName : "",
          Nation : {
            Name : ""
          }
        },
        Layouts : [
          {
            LengthKm : 0,
            Type : "",
            Name : ""
          },
        ]
      },
      layoutTypeOptions:[
        {text: "Oval", value: "Oval"},
        {text: "Road Course", value: "Road Course"}
      ],
      nations : [],
      nationOptions : [],
      existingNation : true,
    }
  },
  methods: {
    onSubmit(){
      this.axios
          .post("http://localhost:6316/track/new", this.form)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },
    addNationOpt(nationName){
      this.nationOptions.push(JSON.parse('{"value" : "'+nationName+'", "text" : "'+nationName+'"}'));
    },
    addLayout(){
      this.form.Layouts.push({
        LengthKm : 0,
        Type : "",
        Name : ""
      })
    }
  },
  mounted() {
    this.axios.get("http://localhost:6316/nation/track/all").then(res => {
      this.nations = res.data;
      res.data.forEach(nation => this.addNationOpt(nation.Name))
    })
  }

}
</script>

<style scoped>

</style>