import Vue from 'vue'
import Router from 'vue-router'
import Menu from './views/Menu.vue'
import Taps from './views/Taps.vue'
import Settings from './views/Settings.vue'
import Stats from './views/Stats.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    }
  ]
})
