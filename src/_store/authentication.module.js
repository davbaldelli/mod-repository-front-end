import { userService } from '@/_services';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    getters :{
        isLogged : state => {
          return state.user.role !== "base"
        },
        isAdmin : (state,getters) => {
         return getters.isLogged && state.user.role === "admin"
        },
        token : state => {
            return state.user.token
        },
        user : state => {
            return state.user
        }
    },
    actions: {
        async login({ dispatch, commit }, { username, password }) {
            commit('loginRequest', { username });

            await userService.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        return user
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}
