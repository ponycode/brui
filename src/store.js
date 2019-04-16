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
  'SET_POURING': 'SET_POURING',
  'SET_POURS': 'SET_POURS'
};

export default new Vuex.Store({
  state: {
    settings: null,
    beers: null,
    taps: null,
    fullscreen: false,
    pouring: false,
    pours: null
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
    [MUTATIONS.SET_POURING] ( state, value ){
      state.pouring = value
    },
    [MUTATIONS.SET_POURS] ( state, pours ) {
      state.pours = pours
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
