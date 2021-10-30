import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from "vue-router"
import { store } from './_store';
import { router } from './_helpers';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios,axios)

Vue.prototype.$serverPath = "https://api.mod.davidebaldelli.it/"


let user = JSON.parse(localStorage.getItem('user'))
if(!user || user.username === 'base'){
    store.dispatch('authentication/login', { 'username' : 'base', 'password' : 'dumbass' })
}




Vue.config.productionTip = false

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')
