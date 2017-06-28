import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: {
      done: 0,
      current: 1
    },
    message: {
      user: {},
      goods: [{
        name: '',
        id: ''
      }]
    },
    order: {
      phone: {name: '', id: ''},
      fault: {id: '', name: '', faults: {id: '', name: '', price: ''}},
      store: [{
        id: '',
        area: '',
        time: {
          day: '',
          range: ''
        }
      }, {
        id: ''
      }, {
        id: ''
      }]

    }
  },
  mutations: {
    SET_MESSAGE: (state, obj) => {
      state.message = obj.res.data.message
      console.log(state.message)
    },
    CHOOSE_ONE: (state, params) => {
      console.log(state)
      if (state.step.done === state.step.current - 1) {
        state.step.done++
      }
      state.step.current = state.step.done + 1
    },
    GO_STEP: (state, params) => {
      console.log(state)
      state.step.current = params
    }
  },
  actions: {
    setMessage: ({ commit }, state) => {
      setTimeout(function () {
        axios.get('/vue/index').then(
          res => {
            commit('SET_MESSAGE', {
              res
            })
          })
      }, 5000)
    },
    chooseOne: ({ commit }, params) => {
      commit('CHOOSE_ONE', params)
    },
    goStep: ({ commit }, params) => {
      commit('GO_STEP', params)
    }
  },
  getters: {
    getUser: (state) => state.message.user,
    getGoods: (state) => state.message.goods,
    getFaults: (state) => state.message.fault,
    getOrder: (state) => state.order,
    getStep: (state) => state.step
  }
})
