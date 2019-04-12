<template>
  <div class="taps" v-if="taps">
    <b-tabs>
      <b-tab :title="tap.tapName" v-for="tap in taps" :key="tap.tapIndex">
        <b-row>
          <b-col>
            <br/>
            <beer-tap-settings :tap="tap"></beer-tap-settings>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
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
  computed: {
    ...mapState({
      taps: state => state.taps
    })
  },
  mounted () {
    this.$store.dispatch( 'fetchTaps' )
  }
}
</script>

<style>
.taps {
  margin-top: 20px;
}
</style>
