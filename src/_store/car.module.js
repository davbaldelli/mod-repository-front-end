import {carService} from "@/_services";

const initialState = {cars: {items: []}, brands: {items: []}, types: {items: []}}

export const cars = {
    namespaced: true,
    state: initialState,
    getters: {
        loadingCars: state => state.cars.fetching,
        cars: state => state.cars.items,
        loadingBrands: state => state.brands.fetching,
        brands: state => state.brands.items,
        loadingTypes: state => state.types.loading,
        types: state => state.types.items
    },
    actions: {
        async getAll({dispatch, commit}) {
            commit('carsFetching')

            await carService.getAll()
                .then(
                    cars => {
                        commit('carsFetched', cars)
                    }
                )
                .catch(
                    error => {
                        commit('carsFetchingError', error)
                        dispatch('alert/error', error, {root: true});
                    }
                )
        },
        async findByModel({dispatch, commit}, model) {
            commit('carsFetching')

            await carService.findByModel(model)
                .then(
                    cars => {
                        commit('carsFetched', cars)
                    }
                )
                .catch(
                    error => {
                        commit('carsFetchingError', error)
                        dispatch('alert/error', error, {root: true});
                    }
                )
        },
        async getCarBrandsGroupedByNation({dispatch, commit}) {
            commit('brandsFetching')
            await carService.getCarBrandsGroupedByNation()
                .then(brands => {
                    commit('brandFetched', brands)
                })
                .catch(error => {
                    commit('brandFetchingError', error)
                    dispatch('alert/error', error, {root: true});
                })
        },
        async getCarTypes({dispatch, commit}) {
            commit('typesFetching')
            await carService.getCarTypes()
                .then(types => {
                    commit('typesFetched', types)
                })
                .catch(error => {
                    commit('typesFetchingError', error)
                    dispatch('alert/error', error, {root: true});
                })
        }
    },
    mutations: {
        carsFetching(state) {
            state.cars = {items: [], fetching: true}
        },
        carsFetched(state, cars) {
            state.cars = {items: cars}
        },
        carsFetchingError(state, error) {
            state.cars = {items: [], error}
        },
        brandsFetching(state) {
            state.brands = {items: [], fetching: true}
        },
        brandFetched(state, brands) {
            state.brands = {items: brands}
        },
        brandFetchingError(state, error) {
            state.brands = {items: [], error}
        },
        typesFetching(state) {
            state.types = {items: [], fetching: true}
        },
        typesFetched(state, types) {
            state.types = {items: types}
        },
        typesFetchingError(state, error) {
            state.types = {items: [], error}
        }
    }
}