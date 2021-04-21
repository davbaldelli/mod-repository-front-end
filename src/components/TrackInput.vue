<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit()">
      <b-form-group
        id="input-group-name"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Track Name:"
        label-for="input-name"
        descripiton="Enter track name"
      >
        <b-form-input
          id="input-name"
          v-model="form.Name"
          placeholder="Enter track name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-year"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Year:"
        label-for="input-year"
        description="Enter track year"
      >
        <b-form-input
          v-model="form.Year"
          type="number"
          id="input-year"
          placeholder="Enter Year"
          number
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Select tags:"
        v-slot="{ ariaDescribedby }"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label-for="input-tags"
      >
        <b-form-checkbox-group
          id="input-tags"
          v-model="form.Tags"
          :options="trackTags"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        >
        </b-form-checkbox-group>
      </b-form-group>
      <b-form-checkbox id="input-premium" v-model="form.Premium"
        >Premium</b-form-checkbox
      >
      <b-form-group
        id="input-group-link"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Download Link:"
        label-for="input-link"
        descripiton="Enter download link"
      >
        <b-form-input
          id="input-link"
          v-model="form.DownloadLink"
          type="url"
          placeholder="Enter download link"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-image"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Image Link:"
        label-for="input-image"
        descripiton="Enter image link"
      >
        <b-form-input
          id="input-image"
          v-model="form.Image"
          type="url"
          placeholder="Enter image link"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-location"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Track Location:"
        label-for="input-location"
        descripiton="Enter track location"
      >
        <b-form-input
          id="input-location"
          v-model="form.Location"
          placeholder="Enter track location"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-nation"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Nation:"
        label-for="input-nation"
      >
        <b-form-select
          id="input-nation"
          v-if="existingNation"
          v-model="form.Nation.Name"
          :options="nationOptions"
          class="mb-3"
        />
        <b-form-input
          id="input-nation"
          v-if="!existingNation"
          v-model="form.Nation.Name"
          placeholder="Enter nation"
          required
        />
      </b-form-group>
      <b-form-checkbox
        v-model="existingNation"
        name="check-button-nation"
        switch
        >Existing Nation</b-form-checkbox
      >
      <b-form-group
        id="form-layouts-group"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Enter Layouts:"
      >
        <div v-for="(layout, index) in form.Layouts" v-bind:key="layout.name">
          <b-form-input
            v-model="form.Layouts[index].Name"
            id="input-layout-name"
            placeholder="Enter layout name"
            required
          ></b-form-input>
          <b-form-input
            v-model="form.Layouts[index].LengthKm"
            type="number"
            id="input-layout-length"
            placeholder="Enter layout length (meters)"
            number
            required
          ></b-form-input>
          <b-form-select
            id="input-layout-Type"
            v-model="form.Layouts[index].Category"
            :options="layoutTypeOptions"
            placeholder="Enter layout type"
            class="mb-3"
          />
        </div>
      </b-form-group>
      <b-button @click="removeLayout" variant="danger">Remove Layout</b-button>
      <b-button @click="addLayout" variant="success">Add Layout</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "TrackInput",
  data() {
    return {
      form: {
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
            LengthKm: 0,
            Category: "",
            Name: "",
          },
        ],
      },
      layoutTypeOptions: [
        { text: "Oval", value: "Oval" },
        { text: "Road Course", value: "Road Course" },
        { text: "A to B", value: "A to B" },
      ],
      trackTags: [
        { text: "F1", value: "F1" },
        { text: "NASCAR", value: "NASCAR" },
        { text: "Historic", value: "Historic" },
        { text: "Rally", value: "Rally" },
        { text: "Drift", value: "Drift" },
        { text: "Open World", value: "Open World" },
        { text: "City Track", value: "City Track" },
        { text: "Touge", value: "Touge" },
        { text: "Endurance", value: "Endurance" },
        { text: "Street Circuit", value: "Street Track" },
        { text: "Fictional", value: "Fictional" },
        { text: "Karting", value: "Karting" },
      ],
      nations: [],
      nationOptions: [],
      existingNation: true,
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post(this.$serverPath + "track/new", this.form)
        .then((res) =>
          alert(JSON.stringify("Pista Inserita Correttamente : " + res.status))
        )
        .catch((err) => alert(JSON.stringify(err)));
    },
    addNationOpt(nationName) {
      this.nationOptions.push(
        JSON.parse(
          '{"value" : "' + nationName + '", "text" : "' + nationName + '"}'
        )
      );
    },
    addLayout() {
      this.form.Layouts.push({
        LengthKm: 0,
        Category: {
          Name: "",
        },
        Name: "",
      });
    },
    removeLayout() {
      this.form.Layouts.pop();
    },
  },
  mounted() {
    this.axios.get(this.$serverPath + "nation/track/all").then((res) => {
      this.nations = res.data;
      res.data.forEach((nation) => this.addNationOpt(nation.Name));
    });
  },
};
</script>

<style scoped>
</style>
