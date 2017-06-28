import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {}
  },
  mutations: {
    SET_LOGIN (state, obj) {
      state.login = obj.res.data.message
    }
  },
  actions: {
    setLogin ({commit}, state) {
    }
  },
  getters: {
    getLogin: (state) => state.login
  }
})
