import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import {Spinner} from 'mint-ui'
import VueLaztLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.component(Spinner.name, Spinner)
Vue.use(VueLaztLoad, {
  loading: '~assets/img/detail/cart.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
