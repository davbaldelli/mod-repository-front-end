<template>
  <b-row>
    <b-col>
      <div class="container">
        <b-form @submit.prevent="onSubmit()">
          <b-form-group
              id="input-group-1"
              content-cols-lg="7"
              descripiton="Enter car model name"
              label="Car Model:"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.ModelName"
                placeholder="Enter car model"
                required
                trim
            ></b-form-input>
          </b-form-group>
          <b-form-checkbox
              id="checkbox-1"
              v-model="form.Premium"
              name="checkbox-1"
          >Premium
          </b-form-checkbox
          >
          <b-form-group
              id="input-group-bhp"
              content-cols-lg="7"
              descripiton="Enter car horsepower"
              label="Car Horsepower (BHP):"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-bhp"
          >
            <b-form-input
                id="input-bhp"
                v-model="form.BHP"
                number
                placeholder="Enter car horsepower"
                type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-torque"
              content-cols-lg="7"
              descripiton="Enter car torque"
              label="Car Torque (Nm):"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-torque"
          >
            <b-form-input
                id="input-bhp"
                v-model="form.Torque"
                number
                placeholder="Enter car torque"
                type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-weight"
              content-cols-lg="7"
              descripiton="Enter car weight"
              label="Car Weight (Kg):"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-weight"
          >
            <b-form-input
                id="input-weight"
                v-model="form.Weight"
                number
                placeholder="Enter car weight"
                type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-top-speed"
              content-cols-lg="7"
              descripiton="Enter car Top Speed"
              label="Car Top Speed (Km/h):"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-top-speed"
          >
            <b-form-input
                id="input-top-speed"
                v-model="form.TopSpeed"
                number
                placeholder="Enter car top speed"
                type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-year"
              content-cols-lg="7"
              descripiton="Enter car model name"
              label="Car Year:"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-year"
          >
            <b-form-input
                id="input-year"
                v-model="form.Year"
                number
                placeholder="Enter car production year"
                required
                type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-drivetrain"
              content-cols-lg="7"
              description="Select drivetrain type"
              label="Drivetrain: "
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-drivetrain"
          >
            <b-form-select
                id="input-drivetrain"
                v-model="form.Drivetrain"
                :options="drivetrainOptions"
                required
            ></b-form-select>
          </b-form-group>
          <b-form-group
              id="input-group-transmission"
              content-cols-lg="7"
              description="Select transmission type"
              label="Gear Type: "
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-transmission"
          >
            <b-form-select
                id="input-transmission"
                v-model="form.Transmission"
                :options="transmissionOptions"
                required
            ></b-form-select>
          </b-form-group>
          <b-form-group
              id="input-group-image"
              content-cols-lg="7"
              descripiton="Enter car image link"
              label="Image Link:"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-image"
          >
            <b-form-input
                id="input-image"
                v-model="form.Image"
                placeholder="Enter car image link"
                required
                type="url"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-2"
              content-cols-lg="7"
              descripiton="Enter car download link"
              label="Download Link:"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-2"
          >
            <b-form-input
                id="input-2"
                v-model="form.DownloadLink"
                placeholder="Enter car download link"
                required
                type="url"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-3"
              content-cols-lg="7"
              descripiton="Enter Brand Name"
              label="Brand Name:"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-3"
          >
            <b-form-select
                v-if="existingBrand"
                id="input-3"
                v-model="form.Brand.Name"
                :options="brandsOpts"
                class="mb-3"
                @change="onBrandChange()"
            />
            <b-form-input
                v-if="!existingBrand"
                id="input-3"
                v-model="form.Brand.Name"
                placeholder="Enter new Brand Name"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-checkbox
              v-model="existingBrand"
              name="check-button-brand"
              switch
          >Existing Brand
          </b-form-checkbox
          >
          <b-form-group
              v-if="!existingBrand"
              id="input-group-4"
              content-cols-lg="7"
              descripiton="Enter new Nation"
              label="Nation Name:"
              label-cols-lg="3"
              label-cols-sm="4"
              label-for="input-4"
          >
            <b-form-input
                v-if="!existingNation && !existingBrand"
                id="input-3"
                v-model="form.Brand.Nation.Name"
                placeholder="Enter new Nation"
                required
            ></b-form-input>
            <b-form-select
                v-if="existingNation && !existingBrand"
                id="input-3"
                v-model="form.Brand.Nation.Name"
                :options="nationOptions"
                class="mb-3"
            />
          </b-form-group>

          <b-form-checkbox
              v-if="!existingBrand"
              v-model="existingNation"
              name="check-button-nation"
              switch
          >Existing Nation
          </b-form-checkbox
          >
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
              id="form-cat-group"
              content-cols-lg="7"
              label="Enter categories"
              label-cols-lg="3"
              label-cols-sm="4"
          >
            <div
                v-for="(category, index) in form.Categories"
                v-bind:key="category.name"
            >
              <b-form-input
                  id="input-category-name"
                  v-model="form.Categories[index].Name"
                  required
              ></b-form-input>
            </div>
          </b-form-group>
          <b-row>
            <b-col>
              <b-button variant="success" @click="addNewCategory"
              >Add Category
              </b-button
              >
              <b-button variant="danger" @click="removeCategory"
              >Remove Category
              </b-button
              >
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
  data() {
    return {
      selected: null,
      form: {
        Torque: 0,
        BHP: 0,
        Weight: 0,
        TopSpeed: 0,
        DownloadLink: "",
        Image: "",
        ModelName: "",
        Author: {
          Name: "",
          Link: "",
        },
        Brand: {
          Name: "",
          Nation: {
            Name: "",
          },
        },
        Year: 0,
        Drivetrain: "",
        Transmission: "",
        Categories: [
          {
            Name: "",
          },
        ],
        Premium: false,
      },
      transmissionOptions: [
        {value: "Sequential", text: "Sequential"},
        {value: "Manual", text: "Manual"},
      ],
      drivetrainOptions: [
        {value: "AWD", text: "AWD"},
        {value: "RWD", text: "RWD"},
        {value: "FWD", text: "FWD"},
      ],
      brandsOpts: [],
      nationOptions: [],
      authorsOptions: [],
      brands: [],
      nations: [],
      authors: [],
      existingBrand: true,
      existingNation: true,
      existingAuthor: true,
    };
  },
  methods: {
    onSubmit() {
      this.axios
          .post(this.$serverPath + "car/new", this.form)
          .then((res) =>
              alert(
                  JSON.stringify("Macchina Inserita Correttamente : " + res.status)
              )
          )
          .catch((err) => alert(JSON.stringify(err.data)));
    },
    addNewCategory() {
      this.form.Categories.push({Name: ""});
    },
    removeCategory() {
      this.form.Categories.pop();
    },
    addBrandOpts(brandName) {
      this.brandsOpts.push(
          JSON.parse(
              '{"value" : "' + brandName + '", "text" : "' + brandName + '"}'
          )
      );
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
    onBrandChange() {
      this.nationOptions = [];
      let nation = "";
      this.brands.forEach((brand) => {
        if (brand.Name === this.form.Brand.Name) {
          nation = brand.Nation;
        }
      });
      this.form.Brand.Nation.Name = nation;
    },
  },
  mounted() {
    this.axios.get(this.$serverPath + "brand/all").then((res) => {
      this.brands = res.data;
      res.data.forEach((val) => this.addBrandOpts(val.Name));
    });
    this.axios.get(this.$serverPath + "nation/brand/all").then((res) => {
      this.nations = res.data;
      res.data.forEach((res) => this.addNationOpt(res.Name));
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
