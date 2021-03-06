import Vue from 'vue';
import Vuex from 'vuex';

import {alert} from './alert.module';
import {authentication} from './authentication.module';
import {cars} from "@/_store/car.module";
import {tracks} from "@/_store/track.module";
import {authors} from "@/_store/author.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        cars,
        tracks,
        authors,
    }
});
