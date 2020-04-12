import Vue from 'vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import Toasted from 'vue-toasted';
import './icons'
import './sockets'
import moment from 'moment'
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';

Vue.filter('formatDate', function(value, format='MM/DD/YYYY hh:mm A') {
  if (value) {
    return moment(String(value)).format(format)
  }
});

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(Toasted, { iconPack: 'fontawesome' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
