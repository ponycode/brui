<template>
  <div class="menuContent">
    <div class="row">
      <div class="col text-center" v-for="tap in taps" :key="tap.tapIndex">
        <h1>
          {{tap.tapName}}
          <span v-if="kegStatuses && kegStatuses[tap.tapIndex]" class="float-right">
            {{kegStatuses[tap.tapIndex].remainingPercent}}%
          </span>
        </h1>
        <div class="beerOnTapContainer">
          <keg-on-tap v-if="tap.Keg" :keg="tap.Keg" :tap-index="tap.tapIndex"></keg-on-tap>
          <div v-else>
            <div class="emptyTap">
              <font-awesome-icon icon="sad-cry" />
            </div>
            <temp-and-humidity />
            <b-button v-if="!fullscreen" size="sm" variant="outline-light" @click="addAKeg(tap.tapIndex)">Add a Keg</b-button>
          </div>
        </div>
      </div>
    </div>
    <add-a-keg-modal ref="addAKegModal"></add-a-keg-modal>
  </div>
</template>

<script>
import TempAndHumidity from '@/components/TempAndHumidity'
import KegOnTap from '@/components/KegOnTap'
import AddAKegModal from '@/components/AddAKegModal'

import { mapState } from 'vuex'

export default {
  name: 'menu',
  components: {
    KegOnTap,
    AddAKegModal,
    TempAndHumidity
  },
  computed: mapState({
    fullscreen: state => state.fullscreen,
    taps: state => state.taps,
    kegStatuses: state => state.kegStatuses
  }),
  methods: {
    removeKegOnTapWithIndex( tapIndex ){
      this.$store.dispatch( 'removeKegFromTap', { tapIndex })
    },
    addAKeg( tapIndex ){
      this.$refs.addAKegModal.show( tapIndex )
    }
  },
  mounted () {
    this.$store.dispatch('fetchTaps')
  }
}
</script>

<style type="scss" scoped>

h1 {
  color: #ccc;
  font-weight: 100;
  border-bottom: 1px solid rgba( 255, 255, 255, 0.2 );
  padding: 12px 0;
  margin-bottom: 30px;
  font-size: 1.8em;
}

.beerOnTapContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyTap{
  font-size: 100px;
  margin-top: 100px;
  color: rgba( 255, 255, 255, 0.2 );
}

</style>
