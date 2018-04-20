import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../view/Home')), 'lesson/home')
const Detail = r => require.ensure([], () => r(require('../view/Detail')), 'lesson/detail')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/lesson/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lesson/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
