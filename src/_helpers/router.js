import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router';
import HelloWorld from "@/components/HelloWorld";
import TrackInput from "@/components/TrackInput";
import CarInput from "@/components/CarInput";
import TrackDetail from "@/components/TrackDetail";
import CarList from "@/components/CarList";
import TrackList from "@/components/TrackList";
import CarDetail from "@/components/CarDetail"
import NotFound from "@/components/404"

Vue.use(Router);

const routes = [
    {
        path: '/', component: HelloWorld,
    },
    {
        path: '/tracks', component: TrackList, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cars', component: CarList, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/track/new', component: TrackInput, meta: {
            requiresAuth: true,
            is_admin: true
        }
    },
    {
        path: '/car/new', component: CarInput, meta: {
            requiresAuth: true,
            is_admin: true,
        }
    },
    {
        path: '/car/:model', component: CarDetail, props: true, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/track/:name', component: TrackDetail, props: true, meta: {
            requiresAuth: true,
        }
    },
    {
      path: '*', component: NotFound
    },
]

export const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.role === "admin") {
                    next()
                    console.log("ciao admin!")
                } else {
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