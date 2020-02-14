<template>
  <div class="root">
    <b-navbar toggleable="md" type="dark" variant="dark" v-show="!fullscreen">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'menu' }" @click="enterFullScreen"><font-awesome-icon icon="arrows-alt" /> BRUI</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{ name: 'stats' }">Stats</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'taps' }">Taps</b-nav-item>
          <b-nav-item :to="{ name: 'beers' }">Beers</b-nav-item>
          <b-nav-item :to="{ name: 'settings' }"><font-awesome-icon icon="cog" /> Settings</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
    <router-view class="container-fluid"/>
    <a v-show="fullscreen" @click="exitFullscreen" class="exitFullscreen">
      <font-awesome-icon icon="compress-arrows-alt" />
    </a>

    <div class="pourModal" :class="{'pourModalVisible': currentPour }">
      <div v-if="currentPour">
        <h1 class="lead">You are Pouring</h1>
        <h2>{{currentPour.beerName}}</h2>
        <h3 class="text-success">{{Math.round( ((currentPour.milliliters || 0) * 0.0338 ) * 100 ) / 100}} floz</h3>

        <div class="text-center mt-4">
          <svg width="111px" height="150px" viewBox="0 0 150 203" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->
              <title>Beer</title>
              <desc>Created with Sketch.</desc>
              <defs>
                  <path d="M102.6,189.5 L20.4,189.5 C18.2,189.5 16.4,187.7 16.4,185.5 L0.6,4.6 C0.6,2.4 2.4,0.6 4.6,0.6 L117.6,0.6 C119.8,0.6 121.6,2.4 121.6,4.6 L106.6,185.5 C106.6,187.8 104.8,189.5 102.6,189.5 Z" id="path-1"></path>
              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Beer">
                      <path d="M125.9,202.1 L22.5,202.1 C18.9,202.1 15.9,199.1 15.9,195.5 L0.7,7.4 C0.7,3.8 3.7,0.8 7.3,0.8 L142.8,0.8 C146.4,0.8 149.4,3.8 149.4,7.4 L132.4,195.5 C132.5,199.1 129.5,202.1 125.9,202.1 Z" id="Glass" fill="#FFFFFF" opacity="0.08"></path>
                      <polygon id="Reflection" fill="#FFFFFF" opacity="0.2" points="60.9 202.1 32 202.1 13 0.8 41.9 0.8"></polygon>
                      <g id="Glass" transform="translate(14.000000, 1.000000)">
                          <mask id="mask-2" fill="white">
                              <use xlink:href="#path-1"></use>
                          </mask>
                          <g id="Path"></g>
                          <g id="BeerHead" mask="url(#mask-2)">
                              <g transform="translate(-82.311516, 160.025045)" id="Rectangle" ref="beerHead" class="beerHead">
                                  <rect fill="#FFB241" x="0.3" y="27.3" width="294" height="164.7"></rect>
                                  <rect fill="#FFEBD3" x="0.3" y="0" width="294" height="29.3"></rect>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      fullscreen: state => state.fullscreen,
      currentPour: state => state.currentPour,
      beerInGlassOffset: state => {
        if( !state.currentPour ) return 0;

        const millilitersIn8Floz = 230;
        const percentOfGlass = state.currentPour.milliliters / millilitersIn8Floz;
        const totalMovement = 100;
        return Math.round( totalMovement * percentOfGlass );
      }
    })
  },
  methods: {
    enterFullScreen () {
      if( document.fullscreenEnabled ){
          document.documentElement.requestFullscreen();
      }
      this.$store.commit('FULLSCREEN', true)
    },
    exitFullscreen () {
      if( document.fullscreenEnabled ){
        document.exitFullscreen();
      }
      this.$store.commit('FULLSCREEN', false)
    }
  },
  watch: {
    beerInGlassOffset( offset ){
      if( !this.$refs.beerHead ) return;

      const start = 160.025045; // stolen from original y translate in svg
      this.$refs.beerHead.setAttribute("transform",`translate(-82.311516, ${start - offset})`);
    }
  },
  mounted () {
    document.addEventListener( 'fullscreenchange', event => {
      if( document.fullscreenEnabled ){
        if( document.fullscreenElement ){
          this.$store.commit('FULLSCREEN', true)
        } else {
          this.$store.commit('FULLSCREEN', false)
        }
      }
    });
  }
}
</script>

<style type="scss" scoped>

.root {
  min-width: 100%;
  min-height: 100%;
  position: relative;
}

.exitFullscreen {
  background-color: black;
  border-radius: 60px;
  position: fixed;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.exitFullscreen svg {
  font-size: 26px;
  color: white;
}

.pourModal{
  position: absolute;
  top: -430px;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  height: 400px;
  padding: 40px;
  border-radius: 30px;
  z-index: 999;
  background-color: #222;
  border: 2px solid silver;
  box-shadow: 0 0 30px rgba( 0, 0, 0, 0.5 );
  transform: translate3d( 0, 0, 0 );
  transition: transform 0.3s;
  color: white;
}

.pourModalVisible {
    transform: translate3d( 0, 530px, 0 );
}

.beerHead{
  transition: 0.5s transform;
}

</style>
