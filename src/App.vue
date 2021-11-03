<template>
  <div id="app">
    <b-navbar fixed="top" sticky type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/cars">Cars</b-nav-item>
        <b-nav-item to="/tracks">Tracks</b-nav-item>
        <b-nav-item v-if="adminLogged" to="/track/new">Add Tracks</b-nav-item>
        <b-nav-item v-if="adminLogged" to="/car/new">Add Cars</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <div v-if="!logged">
          <b-nav-item v-b-modal.modal-login>Login</b-nav-item>
        </div>
        <b-nav-item v-if="logged" @click="logOut">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view :key="routerViewKey"></router-view>
    <div>
      <b-modal
          id="modal-login"
          ref="modal"
          title="Admin Login"
          @hidden="resetModal"
          @ok="handleOk"
          @keydown.native.enter="handleOk"
      >
        <form ref="form" v-on:keyup.enter.stop.prevent="handleSubmit" @submit.stop.prevent="handleSubmit">
          <b-form-group
              :state="nameState"
              invalid-feedback="Username is required"
              label="Username"
              label-for="username-input"
          >
            <b-form-input
                id="username-input"
                v-model="adminUsername"
                :state="nameState"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              invalid-feedback="Password is required"
              label="Password"
              label-for="text-password"
          >
            <b-form-input
                id="text-password"
                v-model="adminPassword"
                :state="nameState"
                aria-describedby="password-help-block"
                required
                type="password"
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
      nameState: null,
      production: true,
      adminUsername: "",
      adminPassword: "",
      routerViewKey: 0,
    };
  },
  computed: {
    logged() {
      return this.$store.getters["authentication/isLogged"]
    },
    adminLogged() {
      return this.$store.getters["authentication/isAdmin"]
    },
    alert() {
      return this.$store.getters["alert/alert"]
    }
  },
  watch: {
    $route() {
      // clear alert on location change
      this.$store.dispatch('alert/clear');
    },
    alert: {
      async handler(value) {
        if (value.message && value.message.status === 401) {
          if (this.$store.getters['authentication/user'].username === 'base') {
            await this.$store.dispatch('authentication/login', {'username': 'base', 'password': 'dumbass'})
                .then(() => this.$store.dispatch('alert/clear'))
            this.$emit('loggedOut')
          } else {
            this.adminUsername = this.$store.getters['authentication/user'].username
            this.$bvModal.show("modal-login")
          }
        }
      }, deep: true
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('authentication/login', {'username': 'base', 'password': 'dumbass'}).then(() =>
          this.$store.dispatch('alert/clear')
      )
      this.$emit('loggedOut')
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
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      await this.$store.dispatch('authentication/login', {
        username: this.adminUsername,
        password: this.adminPassword,
      }).then(() => this.$store.dispatch('alert/clear'))
      this.$emit("loggedIn");

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
