import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted';
import './icons'
import './sockets'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(Toasted, { iconPack: 'fontawesome' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
