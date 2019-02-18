<template>
  <div class="taps">
    <b-tabs>
      <b-tab :title="tap.name" v-for="(tap, index) in taps" :key="index">
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
  computed: mapState({
    taps: state => state.taps
  })
}
</script>

<style>
.taps {
  margin-top: 20px;
}
</style>
