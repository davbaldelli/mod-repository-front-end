<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top" sticky>
      <b-navbar-nav>
        <b-nav-item to="/cars">Cars</b-nav-item>
        <b-nav-item to="/tracks">Tracks</b-nav-item>
        <b-nav-item v-if="adminLogged" to="/track/new">Add Tracks</b-nav-item>
        <b-nav-item v-if="adminLogged" to="/car/new">Add Cars</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <div v-if="!logged">
          <b-nav-item v-b-modal.modal-login to="/">Login</b-nav-item>
        </div>
        <b-nav-item v-if="logged" @click="logOut" to="/"
          >Logout</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
    <div>
      <b-modal
        id="modal-login"
        ref="modal"
        title="Admin Login"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Username"
            label-for="username-input"
            invalid-feedback="Username is required"
            :state="nameState"
          >
            <b-form-input
              id="username-input"
              v-model="adminUsername"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Password"
            label-for="text-password"
            invalid-feedback="Password is required"
          >
            <b-form-input
              v-model="adminPassword"
              type="password"
              id="text-password"
              aria-describedby="password-help-block"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      logged : false,
      nameState: null,
      production: true,
      adminUsername: "",
      adminPassword: "",
      adminLogged: false,
    };
  },
  mounted () {
    if (localStorage.getItem('user').Username != null){
      this.logged = true
      this.adminLogged = JSON.parse(localStorage.getItem('user')).IsAdmin == 1
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    logOut() {
      localStorage.setItem("user", {})
      this.adminLogged = false
      this.logged = false
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.adminUsername = "";
      this.adminPassword = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.axios
        .post(this.$serverPath + "login", {
          username: this.adminUsername,
          password: this.adminPassword,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$emit("loggedIn");
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.logged = true
            this.adminLogged = response.data.IsAdmin;
          }
        })
        .catch((err) => alert("autenticazione fallita => " + err));

      this.$nextTick(() => {
        this.$bvModal.hide("modal-login");
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
