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
  { path: '/tracks', component: TrackTable, meta :{
    guest : true
  } },
  { path: '/cars', component: CarTable, meta :{
    guest : true
  } },
  { path: '/track/new', component : TrackInput, meta :{
    requiresAuth: true,
    is_admin : true
  }},
  { path: '/car/new' , component : CarInput, meta :{
    requiresAuth: true,
    is_admin : true,
  }}
]

const router = new VueRouter({
  mode : 'history',
  routes : routes 
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) { 
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if(to.matched.some(record => record.meta.is_admin)) {
        if(user.IsAdmin == 1){
            next()
        }
        else{
            next(false)
        }
    }else {
        next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
     next()
  }else {
      next()
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
