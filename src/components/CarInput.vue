<template>
  <b-row>
    <b-col>
      <div class="container">
        <b-form @submit.prevent="onSubmit()">
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
          <b-form-checkbox
            id="checkbox-1"
            v-model="form.Premium"
            name="checkbox-1"
            >Premium</b-form-checkbox
          >
          <b-form-group
            id="input-group-bhp"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Car Horsepower (BHP):"
            label-for="input-bhp"
            descripiton="Enter car horsepower"
          >
            <b-form-input
              id="input-bhp"
              v-model="form.BHP"
              placeholder="Enter car horsepower"
              type="number"
              number
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-torque"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Car Toruqe (Nm):"
            label-for="input-torque"
            descripiton="Enter car torque"
          >
            <b-form-input
              id="input-bhp"
              v-model="form.Torque"
              placeholder="Enter car torque"
              type="number"
              number
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-weight"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Car Weight (Kg):"
            label-for="input-weight"
            descripiton="Enter car weight"
          >
            <b-form-input
              id="input-weight"
              v-model="form.Weight"
              placeholder="Enter car weight"
              type="number"
              number
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-top-speed"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Car Top Speed (Km/h):"
            label-for="input-top-speed"
            descripiton="Enter car Top Speed"
          >
            <b-form-input
              id="input-top-speed"
              v-model="form.TopSpeed"
              placeholder="Enter car top speed"
              type="number"
              number
            ></b-form-input>
          </b-form-group>
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
            <b-form-select
              id="input-drivetrain"
              v-model="form.Drivetrain"
              :options="drivetrainOptions"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-transmission"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Gear Type: "
            label-for="input-transmission"
            description="Select transmission type"
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
            <b-form-select
              id="input-3"
              v-if="existingBrand"
              @change="onBrandChange()"
              v-model="form.Brand.Name"
              :options="brandsOpts"
              class="mb-3"
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
            >Existing Brand</b-form-checkbox
          >
          <b-form-group
            id="input-group-author"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Author Name:"
            label-for="input-author"
            descripiton="Enter Author Name"
          >
            <b-form-select
              id="input-author"
              v-if="existingAuthor"
              v-model="form.Author.Name"
              :options="auhtorsOptions"
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
            >Existing Author</b-form-checkbox
          >
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
            <b-form-select
              id="input-3"
              v-if="existingNation && !existingBrand"
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
            >Existing Nation</b-form-checkbox
          >
          <b-form-group
            id="form-cat-group"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-lg="7"
            label="Enter categories"
          >
            <div
              v-for="(category, index) in form.Categories"
              v-bind:key="category.name"
            >
              <b-form-input
                v-model="form.Categories[index].Name"
                id="input-category-name"
                required
              ></b-form-input>
            </div>
          </b-form-group>
          <b-row>
            <b-col>
              <b-button @click="addNewCategory" variant="success"
                >Add Category</b-button
              >
              <b-button @click="removeCategory" variant="danger"
                >Remove Category</b-button
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
        Weight : 0,
        TopSpeed : 0,
        DownloadLink: "",
        Image: "",
        ModelName: "",
        Author : {
          Name : "",
          Link : ""
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
        { value: "Sequential", text: "Sequential" },
        { value: "Manual", text: "Manual" },
      ],
      drivetrainOptions: [
        { value: "AWD", text: "AWD" },
        { value: "RWD", text: "RWD" },
        { value: "FWD", text: "FWD" },
      ],
      brandsOpts: [],
      nationOptions: [],
      auhtorsOptions : [],
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
      if (
        !this.checkExistingBrand(this.form.Brand.Name) &&
        !this.checkExistingNation(this.form.Brand.Nation.Name)
      ) {
        this.axios
          .post(this.$serverPath + "car/new", this.form)
          .then((res) =>
            alert(
              JSON.stringify("Macchina Inserita Correttamente : " + res.status)
            )
          )
          .catch((err) => alert(JSON.stringify(err.data)));
      } else {
        alert("Brand or nation already existing!");
      }
    },
    addNewCategory() {
      this.form.Categories.push({ Name: "" });
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
      this.auhtorsOptions.push(
        JSON.parse(
          '{"value" : "' + authorName + '", "text" : "' + authorName + '"}'
        )
      );
    },
    onBrandChange() {
      this.nationOptions = [];
      var nation = "";
      this.brands.forEach((brand) => {
        if (brand.Name === this.form.Brand.Name) {
          nation = brand.Nation;
        }
      });
      this.form.Brand.Nation.Name = nation;
    },
    checkExistingBrand(brnd) {
      var existing = false;
      this.brands.forEach((brand) => {
        if (brand.Name === brnd) {
          existing = true;
        }
      });
      return existing && !this.existingBrand;
    },
    checkExistingNation(nat) {
      var existing = false;
      this.nations.forEach((nation) => {
        if (nation.Name === nat) {
          existing = true;
        }
      });
      return existing && !this.existingNation;
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
