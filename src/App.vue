<template>
  <div>
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

    <b-modal title="Pouring" v-model="showPouringModal">
      <p class="my-4">POURING</p>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showPouringModal: false
    }
  },
  computed: mapState({
    fullscreen: state => state.fullscreen,
    pouring: state => state.pouring
  }),
  watch:{ 
    pouring (value) {
      this.showPouringModal = value
    }
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

</style>
