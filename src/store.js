import Vue from 'vue'
import Vuex from 'vuex'
import { getSettings, saveSettings, getBeers, saveBeer, getTaps } from './api/settings'
import { getPourHistory, getBeerStats } from './api/stats'
import { getMostRecentBeers, getBeerDetails, updateBeerDetails } from './api/beers'

Vue.use(Vuex)

export const MUTATIONS = {
  'SET_SETTINGS': 'SET_SETTINGS',
  'SET_BEERS': 'SET_BEERS',
  'SET_BEER': 'SET_BEER',
  'SET_TAPS': 'SET_TAPS',
  'FULLSCREEN': 'FULLSCREEN',
  'SET_POURS': 'SET_POURS',
  'POUR_START': 'POUR_START',
  'POUR_STATUS': 'POUR_STATUS',
  'POUR_END': 'POUR_END',
  'SET_BEER_STATS': 'SET_BEER_STATS',
  'SET_MOST_RECENT_BEERS': 'SET_MOST_RECENT_BEERS',
  'SET_BEER_DETAILS': 'SET_BEER_DETAILS'
};

export default new Vuex.Store({
  state: {
    settings: null,
    beers: null,
    taps: null,
    fullscreen: false,
    pours: null,
    currentPour: null,
    beerStats: null,
    mostRecentBeers: null,
    beerDetails: null
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
    [MUTATIONS.POUR_START] ( state, { milliliters, beerName } ){
      state.currentPour = {
        milliliters,
        beerName
      }
    },
    [MUTATIONS.POUR_STATUS] ( state, { milliliters } ) {
      if( !state.currentPour ) return
      state.currentPour.milliliters = milliliters
    },
    [MUTATIONS.POUR_END] ( state ) {
      state.currentPour = null
    },
    [MUTATIONS.SET_BEER_STATS] ( state, beerStats ) {
      state.beerStats = beerStats
    },
    [MUTATIONS.SET_MOST_RECENT_BEERS] ( state, mostRecentBeers ){
      state.mostRecentBeers = mostRecentBeers
    },
    [MUTATIONS.SET_BEER_DETAILS] ( state, beerDetails ){
      state.beerDetails = beerDetails
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
    async fetchMostRecentBeers ({ commit }) {
      const beers = await getMostRecentBeers()
      commit( MUTATIONS.SET_MOST_RECENT_BEERS, beers )
    },
    async fetchBeerDetails ({ commit }, beerId ) {
      const beerDetails = await getBeerDetails( beerId )
      commit( MUTATIONS.SET_BEER_DETAILS, beerDetails )
    },
    async updateBeerDetails ({ commit }, beerDetails ) {
      const updatedBeerDetails = await updateBeerDetails( beerDetails )
      commit( MUTATIONS.SET_BEER_DETAILS, updatedBeerDetails )
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
    },
    async fetchBeerStats({ commit }){
      const stats = await getBeerStats()
      commit( MUTATIONS.SET_BEER_STATS, stats)
    }
  }
})
