import Vue from 'vue'
import Vuex from 'vuex'
import { getSettings, saveSettings } from './api/settings'

Vue.use(Vuex)

export const MUTATIONS = {
  'SET_SETTINGS': 'SET_SETTINGS'
};

export default new Vuex.Store({
  state: {
    settings: {
      numberOfTaps: 1,
      tapNames: []
    },
    taps: [
      {
        name: 'Left Tap',
        beer: {
          name: 'Cholcolate Hazelnut Porter',
          brewer: {
            name: 'Heretic',
            logoUrl: 'https://thefullpint.com/wp-content/uploads/2013/02/Heretic-Brewing-2013.jpg',
          },
          imageUrl: 'https://untappd.akamaized.net/site/beer_logos_hd/beer-447033_aac23_hd.jpeg',
          abv: 7.00,
          ibu: 43,
          description: 'Chocolate Hazelnut Porter, or CHP as we call it, is a dessert in a glass. It is a rich, robust porter bursting with luscious chocolate and hazelnut. Notes of coffee and caramel round out this delicious treat.'
        }
      },
      {
        name: 'Center Tap',
        beer: null
      },
      {
        name: 'Right Tap',
        beer: {
          name: 'Prohibition Ale',
          brewer: {
            name: 'Speakeasy',
            logoUrl: 'https://static1.squarespace.com/static/51af3347e4b0b9ab836de9cd/t/55ca5c74e4b0bc107d12c251/1439325302004/',
          },
          imageUrl: 'https://brewerydb-images.s3.amazonaws.com/beer/a1mQAQ/upload_y6Zupc-large.png',
          abv: 6.1,
          ibu: 50,
          description: 'Prohibition Ale is the first beer we bootlegged back in the early days of the brewery. Anything but traditional, Prohibition pours a deep reddish amber hue, with a fluffy tan head that leaves a beautiful lacing on the glass. A lush, complex aroma teases the senses with juicy grapefruit, citrus, pine, spice and candied caramel malts. Mouth-feel is creamy, with a silky, medium body and modest carbonation.'
        }
      }
    ]
  },
  mutations: {
    [MUTATIONS.SET_SETTINGS] ( state, settings ) {
      state.settings = settings;
    }
  },
  actions: {
    async fetchSettings ({ commit }) {
      commit( MUTATIONS.SET_SETTINGS, await getSettings() )
    },
    async saveSettings ({ commit }, settings) {
      settings = await saveSettings( settings )
      commit( MUTATIONS.SET_SETTINGS, settings )
    }
  }
})
