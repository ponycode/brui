import Vue from 'vue'
import Vuex from 'vuex'
import { getSettings, saveSettings, getBeers, saveBeer, getTaps } from './api/settings'
import { getPourHistory } from './api/stats'

Vue.use(Vuex)

export const MUTATIONS = {
  'SET_SETTINGS': 'SET_SETTINGS',
  'SET_BEERS': 'SET_BEERS',
  'SET_BEER': 'SET_BEER',
  'SET_TAPS': 'SET_TAPS',
  'FULLSCREEN': 'FULLSCREEN',
  'SET_POURS': 'SET_POURS',
  'START_POUR': 'START_POUR,',
  'POUR_STATUS': 'POUR_STATUS',
  'STOP_POUR': 'STOP_POUR'
};

export default new Vuex.Store({
  state: {
    settings: null,
    beers: null,
    taps: null,
    fullscreen: false,
    pouring: false,
    pours: null,
    currentPour: null
  },
  mutations: {
    [MUTATIONS.SET_SETTINGS] ( state, settings ) {
      state.settings = settings
    },
    [MUTATIONS.SET_BEERS] ( state, beers ) {
      state.beers = beers
    },
    [MUTATIONS.SET_BEER] ( state, beer) {
      state.beers[beer.tapIndex] = beer
    },
    [MUTATIONS.SET_TAPS] ( state, taps ) {
      state.taps = taps
    },
    [MUTATIONS.FULLSCREEN] ( state, value ) {
      state.fullscreen = value
    },
  
    [MUTATIONS.SET_POURS] ( state, pours ) {
      state.pours = pours
    },
    [MUTATIONS.START_POUR] ( state, { milliliters, beerName } ){
      state.pour = {
        milliliters,
        beerName
      }
    },
    [MUTATIONS.POUR_STATUS] ( state, { milliliters } ) {
      state.pour.milliliters = milliliters
    },
    [MUTATIONS.STOP_POUR] ( state ) {
      state.pour = null
    }
  },
  actions: {
    async fetchSettings ({ commit }) {
      commit( MUTATIONS.SET_SETTINGS, await getSettings() )
    },
    async saveSettings ({ commit }, settings) {
      settings = await saveSettings( settings )
      commit( MUTATIONS.SET_SETTINGS, settings )
    },
    async fetchBeers ({ commit }) {
      const beers = await getBeers()
      commit( MUTATIONS.SET_BEERS, beers )
    },
    async saveBeer ({ dispatch }, { beer, tapIndex }) {
      await saveBeer( tapIndex, beer )
      dispatch('fetchTaps')
    },
    async fetchTaps({ commit }) {
      const taps = await getTaps()
      commit( MUTATIONS.SET_TAPS, taps)
    },
    async fetchPours({ commit }){
      const taps = await getPourHistory()
      commit( MUTATIONS.SET_POURS, taps)
    }
  }
})
