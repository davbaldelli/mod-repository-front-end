<template>
  <div>
    <b-form @submit="onSubmit()">
      <b-form-group
        id="input-group-1"
        label="Car Model:"
        label-for="input-1"
        descripiton="Enter car model name"
      >
        <b-form-input
          id="input-1"
          v-model="form.ModelName"
          placeholder="Enter car model"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-2"
          label="Download Link:"
          label-for="input-2"
          descripiton="Enter car download link"
      >
        <b-form-input
            id="input-2"
            v-model="form.DownloadLink"
            type="url"
            placeholder="Enter car download link"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-3"
          label="Car Brand:"
          label-for="input-3"
          descripiton="Enter car brand"
      >
        <b-form-input
            id="input-3"
            v-model="form.Brand.Name"
            placeholder="Enter car brand"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-4"
          label="Car Brand Nation:"
          label-for="input-4"
          descripiton="Enter car brand nation"
      >
        <b-form-input
            id="input-4"
            v-model="form.Brand.Nation.Name"
            placeholder="Enter car brand nation"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="form-cat-group"
          label="Enter categories"
      >
        <div v-for="(category, index) in form.Categories" v-bind:key="category.name">
          <b-form-input
              v-model="form.Categories[index]"
              id="input-cat"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-button @click="addNewCategory">Add Category</b-button>
      <b-button @click="sendData">Send data</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <pre>{{ form }}</pre>
  </div>

</template>

<script>
export default {
  name: "CarInput",
  data(){
    return {
      form : {
        DownloadLink : 'https://mega.nz',
        ModelName : 'F2005',
        Brand : {
          Name : 'Ferrari',
          Nation : {
            Name : 'Italy'
          }
        },
        Categories : ["F1"]
      }
    }
  },
  methods: {
    onSubmit() {
      this.axios
      .post("http://localhost:6316/car/new",this.form)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    sendData(){
      this.axios
          .post("http://localhost:6316/car/new",this.form)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },
    addNewCategory(){
      this.form.Categories.push('')
    }
  }
}
</script>

<style scoped>

</style>