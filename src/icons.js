import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompressArrowsAlt, faArrowsAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

library.add(faCompressArrowsAlt, faArrowsAlt, faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)
