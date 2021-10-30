import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from "@/components/HelloWorld";
import TrackTable from "@/components/TrackTable";
import CarTable from "@/components/CarTable";
import TrackInput from "@/components/TrackInput";
import CarInput from "@/components/CarInput";
import CarDetail from "@/components/CarDetail";
import TrackDetail from "@/components/TrackDetail";
import VueRouter from "vue-router";

Vue.use(Router);

const routes = [
    {
        path: '/', component: HelloWorld,
    },
    { path: '/tracks', component: TrackTable, meta :{
            requiresAuth: true,
        } },
    { path: '/cars', component: CarTable, meta :{
            requiresAuth: true,
        } },
    { path: '/track/new', component : TrackInput, meta :{
            requiresAuth: true,
            is_admin : true
        }},
    { path: '/car/new' , component : CarInput, meta :{
            requiresAuth: true,
            is_admin : true,
        }},
    { path: '/car/:model', component : CarDetail, props : true ,meta :{
            requiresAuth: true,
        }},
    { path: '/track/:name', component : TrackDetail, props : true, meta :{
            requiresAuth: true,
        }},
]

export const router = new VueRouter({
    mode : 'history',
    routes : routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        let user = JSON.parse(localStorage.getItem('user'))
        if(user){
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.role === "admin"){
                    next()
                    console.log("ciao admin!")
                }
                else{
                    console.log("questa pagina non fa per te!")
                    next('/')
                }
            }
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})