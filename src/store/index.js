import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  imgLoaded: 0,
  scrollHeight: 0,
  curTyper: 'pop',
  detailImage: 0,
  detailLoaded: 0,
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations: {
    addCar (state, payload) {
      for (let i in state.cartList) {
        if (state.cartList[i].iid === payload.iid) return
      }
      state.cartList.push(payload)
    }
  }
})

export default store
