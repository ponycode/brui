<template>
  <div class="taps">
    <div v-for="(tap, index) in taps" :key="index">
      <beer-tap-settings :tap="tap"></beer-tap-settings>
      <hr/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BeerTapSettings from '@/components/BeerTapSettings'

export default {
  name: 'taps',
  components: {
    BeerTapSettings
  },
  computed: mapState({
    taps: state => state.taps
  })
}
</script>
