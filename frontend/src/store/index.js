import { createStore } from 'vuex'
import userService from '../services/userService.js'

const user = JSON.parse(localStorage.getItem('userData'));
// interoge le localstorage, si user connecté logged true sinon logged false
const initalState = user
  ? {status: {loggedIn: true}, user}
  : {status: {loggedIn: false}, user: null}

export default createStore({
  state: initalState,
  mutations: {
    loginSuccess(state, user){
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state){
      state.status.loggedIn = false
      state.user = null
    },
    logout(state){
      state.status.loggedIn = false
      state.user = null
    }
  },
  actions: {
    login({commit}, user){
        return userService.login(user).then(
          (user) => {
            commit("loginSuccess", user.data.userData);
            return Promise.resolve(user);
          },
          (error) => {
            commit("loginFailure");
            return Promise.reject(error);
          }
        );
      },
      logout({ commit }) {
        userService.logout();
        commit("logout");
      },
    }
  }
)
