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
          <b-nav-item :to="{ name: 'taps' }">Taps / Beers</b-nav-item>
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
      currentPour: state => state.currentPour
    })
  },
  methods: {
    enterFullScreen () {
      this.$store.commit('FULLSCREEN', true)
    },
    exitFullscreen () {
      this.$store.commit('FULLSCREEN', false)
    }
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
  top: -300px;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  height: 300px;
  padding: 40px;
  border-radius: 30px;
  z-index: 999;
  background-color: white;
  transform: translate3d( 0, 0, 0 );
  transition: transform 0.3s;
}

.pourModalVisible {
    transform: translate3d( 0, 400px, 0 );
}

</style>
