import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  imgLoaded: 0,
  scrollHeight: 0,
  curTyper: 'pop',
  detailImage: 0,
  detailLoaded: 0
}

const store = new Vuex.Store({
  state
})

export default store
