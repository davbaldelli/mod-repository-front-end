<template>
<b-row>
  <b-col>
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
      <b-form-checkbox id="checkbox-1" v-model="form.Premium" name="checkbox-1">Premium</b-form-checkbox> 
      <b-form-group
        id="input-group-year"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Car Year:"
        label-for="input-year"
        descripiton="Enter car model name"
      >
        <b-form-input
          id="input-year"
          v-model="form.Year"
          placeholder="Enter car production year"
          type="number"
          number
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-drivetrain"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Drivetrain: "
        label-for="input-drivetrain"
        description="Select drivetrain type"
      >
        <b-form-select id="input-drivetrain" v-model="form.Drivetrain" :options="drivetrainOptions" required></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-geartype"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-lg="7"
        label="Gear Type: "
        label-for="input-geartype"
        description="Select gear type"
      >
        <b-form-select id="input-geartype" v-model="form.GearType" :options="gearTypeOptions" required></b-form-select>
      </b-form-group>
      <b-form-group
          id="input-group-image"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-lg="7"
          label="Image Link:"
          label-for="input-image"
          descripiton="Enter car image link"
      >
        <b-form-input
            id="input-image"
            v-model="form.Image"
            type="url"
            placeholder="Enter car image link"
            required
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
          descripiton="Enter Brand Name"
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
             required
         ></b-form-input>
       </div>
      </b-form-group>
      <b-row>
        <b-col>
          <b-button @click="addNewCategory" variant="success">Add Category</b-button>
          <b-button @click="removeCategory" variant="danger">Remove Category</b-button>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
  </b-col>
</b-row>
</template>

<script>
export default {
  name: "CarInput",
  data(){
    return {
      selected: null,
      form : {
        DownloadLink : '',
        Image : '',
        ModelName : '',
        Brand : {
          Name : "",
          Nation : {
            Name : ""
          }
        },
        Year : 0,
        Drivetrain : "",
        GearType : "",
        Categories : [{
          Name : ""
        }],
        Premium : false
      },
      gearTypeOptions : [
        {value : "SEQUENTIAL", text : "Sequential"},
        {value : "MANUAL", text : "Manual"},
      ],
      drivetrainOptions : [
        {value : "AWD", text : "AWD"},
        {value : "RWD", text : "RWD"},
        {value : "FWD", text : "FWD"},
      ],
      brandsOpts: [],
      nationOptions: [],
      brands : [],
      nations: [],
      existingBrand : true,
      existingNation : true,
      serverPath: "https://api.mod.davidebaldelli.it/"
    }
  },
  methods: {
    onSubmit() {
      if(!this.checkExistingBrand(this.form.Brand.Name) && !this.checkExistingNation(this.form.Brand.Nation.Name)) {
        this.axios
            .post(this.serverPath+"car/new", this.form ,)
            .then(res => alert(JSON.stringify("Macchina Inserita Correttamente : "+res.status)))
            .catch(err => alert(JSON.stringify(err.data)))
      } else {
        alert("Brand or nation already existing!")
      }

    },
    addNewCategory(){
      this.form.Categories.push({Name : ""})
    },
    removeCategory(){
      this.form.Categories.pop()
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
