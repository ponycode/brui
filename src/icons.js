import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompressArrowsAlt, faArrowsAlt, faCog, faSadCry, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

library.add(faCompressArrowsAlt, faArrowsAlt, faCog, faSadCry, faChevronLeft, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
