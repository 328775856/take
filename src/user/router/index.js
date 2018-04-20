import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../view/Home')), 'user/home')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/lesson/',
      name: 'Home',
      component: Home
    }
  ]
})
