<template>
  <div>
    <b-form @submit.prevent="onSubmit()">
      <ul id="errors">
        <li v-for="error in errors" :key="error">
          {{ error}}
        </li>
      </ul>
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
      <b-form-select v-if="existingBrand" @change="onBrandChange()" v-model="form.Brand.Name" :options="brandsOpts" class="mb-3"/>
      <b-form-group
          id="input-group-3"
          label="Brand Name:"
          label-for="input-3"
          descripiton="Enter new Brand Name"
          v-if="!existingBrand"
      >
        <b-form-input
            id="input-3"
            v-model="form.Brand.Name"
            placeholder="Enter new Brand Name"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-checkbox v-model="existingBrand" name="check-button-brand" switch>Existing Brand</b-form-checkbox>
      <b-form-group
        id="input-group-4"
        label="Nation Name:"
        label-for="input-4"
        descripiton="Enter new Nation"
        v-if="!existingNation && !existingBrand"
      >
        <b-form-input
            id="input-3"
            v-model="form.Brand.Nation.Name"
            placeholder="Enter new Nation"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-select v-if="existingNation && !existingBrand"  v-model="form.Brand.Nation.Name" :options="nationOptions" class="mb-3"/>
      <b-form-checkbox v-if="!existingBrand" v-model="existingNation" name="check-button-nation" switch>Existing Nation</b-form-checkbox>
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
        ModelName : '',
        Brand : {
          Name : "",
          Nation : {
            Name : ""
          }
        },
        Categories : [""]
      },
      brandsOpts: [],
      nationOptions: [],
      brands : [],
      nations: [],
      existingBrand : true,
      existingNation : true,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(!this.checkExistingBrand(this.form.Brand.Name) && !this.checkExistingNation(this.form.Brand.Nation.Name)) {
        this.errors = []
        this.axios
            .post("http://localhost:6316/car/new", this.form)
            .then(res => console.log(res))
            .catch(err => console.log(err))
      } else {
        this.errors.push("brand or nation already existing")
      }

    },
    addNewCategory(){
      this.form.Categories.push('')
    },
    addBrandOpts(brandName){
      this.brandsOpts.push(JSON.parse('{"value" : "'+brandName+'", "text" : "'+brandName+'"}'));
    },
    addNationOpt(nationName){
      this.nationOptions.push(JSON.parse('{"value" : "'+nationName+'", "text" : "'+nationName+'"}'));
    },
    onBrandChange(){
      this.nationOptions = []
      var nation = ""
      this.brands.forEach(brand => {
        if (brand.Name === this.form.Brand.Name){
          nation = brand.Nation;
        }
      });
      this.form.Brand.Nation.Name = nation
    },
    checkExistingBrand(brnd){
      var existing = false;
      this.brands.forEach(brand => {
        if (brand.Name === brnd){
          existing = true;
        }
      });
      return existing && !this.existingBrand;
    },
    checkExistingNation(nat){
      var existing = false;
      this.nations.forEach(nation => {
        if (nation.Name === nat){
          existing = true;
        }
      });
      return existing && !this.existingNation;
    }
  },
  mounted() {
    this.axios.get("http://localhost:6316/brand/all")
    .then(res => {this.brands = res.data ; res.data.forEach(val =>this.addBrandOpts(val.Name))});
    this.axios.get("http://localhost:6316/nation/brand/all")
    .then(res => {this.nations = res.data; res.data.forEach(res => this.addNationOpt(res.Name))})
  }

}
</script>

<style scoped>

</style>