import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  imgLoaded: 0,
  scrollHeight: 0,
  curTyper: 'pop',
  detailImage: 0,
  detailLoaded: 0,
  cartList: [],
  allCheck: false
}

const store = new Vuex.Store({
  state,
  mutations: {
    addCar (state, payload) {
      let product = null
      for (let i in state.cartList) {
        if (state.cartList[i].iid === payload.iid) {
          product = state.cartList[i]
        }
      }
      if (product) {
        product.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    },
    jianCart (state, payload) {
      for (let i in state.cartList) {
        if (state.cartList[i].iid === payload.iid) {
          if (state.cartList[i].count !== 1) {
            state.cartList[i].count -= 1
          } else {
            state.cartList.splice(i, 1)
          }
        }
      }
    },
    addCart (state, payload) {
      for (let i in state.cartList) {
        if (state.cartList[i].iid === payload.iid) {
          state.cartList[i].count += 1
        }
      }
    },
    checkClick (state, payload) {
      let n = 0
      for (let i in state.cartList) {
        if (state.cartList[i].iid === payload.iid) {
          state.cartList[i].checked = true
        }
        if (state.cartList[i].checked === true) n++
      }
      if (n === state.cartList.length) state.allCheck = true
    },
    qxClick (state, payload) {
      for (let i in state.cartList) {
        if (state.cartList[i].iid === payload.iid) {
          state.cartList[i].checked = false
        }
      }
      state.allCheck = false
    },
    allClick (state) {
      for (let i in state.cartList) {
        state.cartList[i].checked = true
      }
      state.allCheck = true
    },
    qxAllClick (state) {
      for (let i in state.cartList) {
        state.cartList[i].checked = false
      }
      state.allCheck = false
    }
  }
})

export default store
