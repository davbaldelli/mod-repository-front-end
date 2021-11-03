<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit()">
      <b-form-group
          id="input-group-name"
          content-cols-lg="7"
          descripiton="Enter track name"
          label="Track Name:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-name"
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
          content-cols-lg="7"
          description="Enter track year"
          label="Year:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-year"
      >
        <b-form-input
            id="input-year"
            v-model="form.Year"
            number
            placeholder="Enter Year"
            type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          v-slot="{ ariaDescribedby }"
          content-cols-lg="7"
          label="Select tags:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-tags"
      >
        <b-form-checkbox-group
            id="input-tags"
            v-model="form.Tags"
            :aria-describedby="ariaDescribedby"
            :options="trackTags"
            name="flavour-1"
        >
        </b-form-checkbox-group>
      </b-form-group>
      <b-form-checkbox id="input-premium" v-model="form.Premium"
      >Premium
      </b-form-checkbox
      >
      <b-form-group
          id="input-group-link"
          content-cols-lg="7"
          descripiton="Enter download link"
          label="Download Link:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-link"
      >
        <b-form-input
            id="input-link"
            v-model="form.DownloadLink"
            placeholder="Enter download link"
            required
            type="url"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-image"
          content-cols-lg="7"
          descripiton="Enter image link"
          label="Image Link:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-image"
      >
        <b-form-input
            id="input-image"
            v-model="form.Image"
            placeholder="Enter image link"
            required
            type="url"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-author"
          content-cols-lg="7"
          descripiton="Enter Author Name"
          label="Author Name:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-author"
      >
        <b-form-select
            v-if="existingAuthor"
            id="input-author"
            v-model="form.Author.Name"
            :options="authorsOptions"
            class="mb-3"
        />
        <b-form-input
            v-if="!existingAuthor"
            id="input-author"
            v-model="form.Author.Name"
            placeholder="Enter new Author Name"
            required
        ></b-form-input>
        <b-form-input
            v-if="!existingAuthor"
            id="input-author-link"
            v-model="form.Author.Link"
            placeholder="Enter new Author Link"
        ></b-form-input>
      </b-form-group>
      <b-form-checkbox
          v-model="existingAuthor"
          name="check-button-author"
          switch
      >Existing Author
      </b-form-checkbox
      >
      <b-form-group
          id="input-group-location"
          content-cols-lg="7"
          descripiton="Enter track location"
          label="Track Location:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-location"
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
          content-cols-lg="7"
          label="Nation:"
          label-cols-lg="3"
          label-cols-sm="4"
          label-for="input-nation"
      >
        <b-form-select
            v-if="existingNation"
            id="input-nation"
            v-model="form.Nation.Name"
            :options="nationOptions"
            class="mb-3"
        />
        <b-form-input
            v-if="!existingNation"
            id="input-nation"
            v-model="form.Nation.Name"
            placeholder="Enter nation"
            required
        />
      </b-form-group>
      <b-form-checkbox
          v-model="existingNation"
          name="check-button-nation"
          switch
      >Existing Nation
      </b-form-checkbox
      >
      <b-form-group
          id="form-layouts-group"
          content-cols-lg="7"
          label="Enter Layouts:"
          label-cols-lg="3"
          label-cols-sm="4"
      >
        <div v-for="(layout, index) in form.Layouts" v-bind:key="layout.name">
          <b-form-input
              id="input-layout-name"
              v-model="form.Layouts[index].Name"
              placeholder="Enter layout name"
              required
          ></b-form-input>
          <b-form-input
              id="input-layout-length"
              v-model="form.Layouts[index].LengthM"
              number
              placeholder="Enter layout length (meters)"
              required
              type="number"
          ></b-form-input>
          <b-form-select
              id="input-layout-Type"
              v-model="form.Layouts[index].Category"
              :options="layoutTypeOptions"
              class="mb-3"
              placeholder="Enter layout type"
          />
        </div>
      </b-form-group>
      <b-button variant="danger" @click="removeLayout">Remove Layout</b-button>
      <b-button variant="success" @click="addLayout">Add Layout</b-button>
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
            LengthM: 0,
            Category: "",
            Name: "",
          },
        ],
        Author: {
          Name: "",
          Link: "",
        },
      },
      layoutTypeOptions: [
        {text: "Oval", value: "Oval"},
        {text: "Road Course", value: "Road Course"},
        {text: "A to B", value: "A to B"},
      ],
      trackTags: [
        {text: "F1", value: "F1"},
        {text: "NASCAR", value: "NASCAR"},
        {text: "Historic", value: "Historic"},
        {text: "Rally", value: "Rally"},
        {text: "Drift", value: "Drift"},
        {text: "Open World", value: "Open World"},
        {text: "City Track", value: "City Track"},
        {text: "Touge", value: "Touge"},
        {text: "Endurance", value: "Endurance"},
        {text: "Street Circuit", value: "Street Track"},
        {text: "Fictional", value: "Fictional"},
        {text: "Karting", value: "Karting"},
      ],
      nations: [],
      nationOptions: [],
      existingNation: true,
      authors: [],
      authorsOptions: [],
      existingAuthor: true,
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
    addAuthorOpt(authorName) {
      this.authorsOptions.push(
          JSON.parse(
              '{"value" : "' + authorName + '", "text" : "' + authorName + '"}'
          )
      );
    },
    addLayout() {
      this.form.Layouts.push({
        LengthM: 0,
        Category: "",
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
    this.axios.get(this.$serverPath + "author/all").then((res) => {
      this.authors = res.data;
      res.data.forEach((res) => this.addAuthorOpt(res.Name));
    });
  },
};
</script>

<style scoped>
</style>
