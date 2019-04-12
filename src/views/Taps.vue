<template>
  <div class="taps" v-if="taps">
    <b-tabs>
      <b-tab :title="tap.name" v-for="tap in taps" :key="tap.tapIndex">
        <b-row>
          <b-col>
            <br/>
            <beer-tap-settings :tapIndex="tap.tapIndex"></beer-tap-settings>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BeerTapSettings from '@/components/BeerTapSettings'

export default {
  name: 'taps',
  components: {
    BeerTapSettings
  },
  computed: {
    ...mapGetters(['taps'])
  },
  mounted () {
    this.$store.dispatch( 'fetchTaps' )
    // this.$store.dispatch('fetchSettings')
    // this.$store.dispatch('fetchBeers')
  }
}
</script>

<style>
.taps {
  margin-top: 20px;
}
</style>
