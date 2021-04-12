<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit()" >
      <ul id="errors">
        <li v-for="error in errors" :key="error">
          {{ error}}
        </li>
      </ul>
      <b-form-group
        id="input-group-1"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Car Model:"
        label-for="input-1"
        descripiton="Enter car model name"
      >
        <b-form-input
          id="input-1"
          v-model="form.ModelName"
          placeholder="Enter car model"
          required
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-2"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-lg="7"
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
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-lg="7"
          label="Brand Name:"
          label-for="input-3"
          descripiton="Enter new Brand Name"
      >
        <b-form-select id="input-3" v-if="existingBrand" @change="onBrandChange()" v-model="form.Brand.Name" :options="brandsOpts" class="mb-3"/>
        <b-form-input
            v-if="!existingBrand"
            id="input-3"
            v-model="form.Brand.Name"
            placeholder="Enter new Brand Name"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-checkbox v-model="existingBrand" name="check-button-brand" switch>Existing Brand</b-form-checkbox>
      <b-form-group
        id="input-group-4"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Nation Name:"
        label-for="input-4"
        descripiton="Enter new Nation"
        v-if="!existingBrand"
      >
        <b-form-input
            v-if="!existingNation && !existingBrand"
            id="input-3"
            v-model="form.Brand.Nation.Name"
            placeholder="Enter new Nation"
            required
        ></b-form-input>
        <b-form-select id="input-3" v-if="existingNation && !existingBrand"  v-model="form.Brand.Nation.Name" :options="nationOptions" class="mb-3"/>
      </b-form-group>

      <b-form-checkbox v-if="!existingBrand" v-model="existingNation" name="check-button-nation" switch>Existing Nation</b-form-checkbox>
      <b-form-group
          id="form-cat-group"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-lg="7"
          label="Enter categories"
      >
       <div v-for="(category, index) in form.Categories" v-bind:key="category.name">
         <b-form-input
             v-model="form.Categories[index].Name"
             id="input-category-name"
         ></b-form-input>
       </div>
      </b-form-group>
      <b-row>
        <b-col cols="6" md="4"/>
        <b-col cols="6" md="4">
          <b-button @click="addNewCategory">Add Category</b-button>
        </b-col>

      </b-row>

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
        DownloadLink : '',
        ModelName : '',
        Brand : {
          Name : "",
          Nation : {
            Name : ""
          }
        },
        Categories : [{
          Name : ""
        }]
      },
      brandsOpts: [],
      nationOptions: [],
      brands : [],
      nations: [],
      existingBrand : true,
      existingNation : true,
      errors: [],
      serverPath: "http://api.mods.davidebaldelli.it"
    }
  },
  methods: {
    onSubmit() {
      if(!this.checkExistingBrand(this.form.Brand.Name) && !this.checkExistingNation(this.form.Brand.Nation.Name)) {
        this.errors = []
        this.axios
            .post(this.serverPath+"car/new", this.form ,)
            .then(res => alert(JSON.stringify("Macchina Inserita Correttamente : "+res.status)))
            .catch(err => alert(JSON.stringify(err)))
      } else {
        this.errors.push("brand or nation already existing")
      }

    },
    addNewCategory(){
      this.form.Categories.push({Name : ""})
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
    this.axios.get(this.serverPath+"brand/all")
    .then(res => {this.brands = res.data ; res.data.forEach(val =>this.addBrandOpts(val.Name))});
    this.axios.get(this.serverPath+"nation/brand/all")
    .then(res => {this.nations = res.data; res.data.forEach(res => this.addNationOpt(res.Name))})
  }

}
</script>

<style scoped>

</style>