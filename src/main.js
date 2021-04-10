import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from "vue-router"
import TrackTable from "@/components/TrackTable"
import CarTable from "@/components/CarTable";
import CarInput from "@/components/CarInput"
import TrackInput from "@/components/TrackInput"

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios,axios)


const routes = [
  { path: '/tracks', component: TrackTable },
  { path: '/cars', component: CarTable },
  { path: '/track/new', component : TrackInput},
  { path: '/car/new' , component : CarInput}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
