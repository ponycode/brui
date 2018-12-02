import Vue from 'vue'
import Router from 'vue-router'
import Menu from './views/Menu.vue'
import Taps from './views/Taps.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu
    },
    {
      path: '/taps',
      name: 'taps',
      component: Taps
    }
  ]
})
