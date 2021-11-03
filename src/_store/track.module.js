import {trackService} from "@/_services";

const initialState = {tracks: {items: []}, nations: {items: []}}

export const tracks = {
    namespaced: true,
    state: initialState,
    getters: {
        tracks : state => state.tracks.items,
        loadingTracks : state => state.tracks.fetching,
        nations : state => state.nations.items,
        loadingNations : state => state.nations.fetching
    },
    actions: {
        async getAllTracks({dispatch, commit}) {
            commit('tracksFetching')

            await trackService.getAll()
                .then(tracks => {
                        commit('tracksFetched', tracks)
                    }
                )
                .catch(error => {
                    commit('tracksFetchError', error)
                    dispatch('alert/error', error, {root: true});
                })
        },
        async getAllNations({dispatch, commit}) {
            commit('nationsFetching')
            await trackService.getTracksNations()
                .then(nations => {
                    commit('nationsFetched', nations)
                })
                .catch(err => {
                    commit('nationsFetchError', err)
                    dispatch('alert/error', err, {root: true})
                })
        }
    },
    mutations: {
        tracksFetching(state) {
            state.tracks = {items: [], fetching : true}
        },
        tracksFetched(state, tracks) {
            state.tracks = {items: tracks}
        },
        tracksFetchError(state, error) {
            state.tracks = {items: [], error}
        },
        nationsFetching(state) {
            state.nations = {items: [], fetching : true}
        },
        nationsFetched(state, nations) {
            state.nations = {items: nations}
        },
        nationsFetchError(state, error) {
            state.nations = {items: [], error}
        }
    }
}