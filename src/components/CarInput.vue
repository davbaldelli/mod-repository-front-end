<template>
  <div>
    <b-form @submit.prevent="onSubmit()">
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
      <b-form-select @change="onBrandChange()" v-model="form.Brand.Name" :options="brandsOpts" class="mb-3"/>
      <b-form-select v-model="form.Brand.Nation.Name" :options="nationOptions" class="mb-3"/>
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
      selected: null,
      form : {
        DownloadLink : 'https://mega.nz',
        ModelName : 'F2005',
        Brand : {
          Name : "Ferrari",
          Nation : {
            Name : null
          }
        },
        Categories : ["F1"]
      },
      brandsOpts: [],
      brandNations : [],
      nationOptions : []
    }
  },
  methods: {
    onSubmit() {
      this.axios
      .post("http://localhost:6316/car/new",this.form)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    addNewCategory(){
      this.form.Categories.push('')
    },
    addNewBrand(brandName){
      this.brandsOpts.push(JSON.parse('{"value" : "'+brandName+'", "text" : "'+brandName+'"}'));
    },
    onBrandChange(){
      this.nationOptions = []
      var nation = ""
      this.brandNations.forEach( brand => {
        if (brand.Name === this.form.Brand.Name){
          nation = brand.Nation;
        }
      });
      this.nationOptions.push(JSON.parse('{"value" : "'+nation+'", "text" : "'+nation+'"}'))
    }
  },
  mounted() {
    this.axios.get("http://localhost:6316/brand/all")
    .then(res => {this.brandNations = res.data ; res.data.forEach( val =>this.addNewBrand(val.Name))});
  }

}
</script>

<style scoped>

</style>