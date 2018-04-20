// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Index from './index'
import router from './router'
import axios from 'axios'
import wxa from '@/assets/js/wxa'

import '@/assets/fonts/iconfont.css'

import adaptor from '@/assets/js/screen-adaptor'
adaptor(750, (screen) => {
  return Math.min(screen.width, screen.height*0.8)
})

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.prototype.axios = axios
Vue.prototype.wxa = wxa

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {Index},
  template: '<index/>'
})
