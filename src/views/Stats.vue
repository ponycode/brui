<template>
  <div class="stats pt-3">

    <pours-chart></pours-chart>

    <h3 class="mt-3">Keg History</h3>
    <table class="table mt-5">
      <tr>
        <th>Beer</th>
        <th>Poured</th>
        <th>Number of Pours</th>
        <th>Days on Tap</th>
      </tr>
      <tr v-for="beerStat in beerStats" :key="beerStat.beerId">
        <td>{{beerStat.name}}</td>
        <td>
          <span v-if="beerStat.gallons > 1">{{beerStat.gallons}} gal.</span>
          <span v-else-if="beerStat.floz > 0">{{beerStat.floz}} floz</span>
          <span v-else>0 floz</span>
        </td>
        <td>{{beerStat.numberOfPours}}</td>
        <td>{{beerStat.daysOnTap}}</td>
      </tr>
    </table>

    <h3 class="mt-3">Pour History</h3>
    <table class="table">
      <tr>
        <th>Date</th>
        <th>Beer</th>
        <th>Floz. / Milliliters</th>
        <th>Duration</th>
        <th>Ticks</th>
      </tr>
      <tr v-for="pour in pours" :key="pour.pourId">
        <td>{{pour.createdAt | formatDate}}</td>
        <td>{{pour.beerName}}</td>
        <td>{{Math.round( (pour.milliliters * 0.0338 ) * 100 ) / 100}} floz / {{pour.milliliters}} ml</td>
        <td>{{pour.durationSeconds}}s</td>
        <td>{{pour.tickCount}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import PoursChart from '../components/PoursChart'

export default {
  name: 'stats',
  components: { PoursChart },
  computed: {
    ...mapState({
      pours: state => state.pours,
      beerStats: state => state.beerStats
    })
  },
  async mounted () {
    this.$store.dispatch('fetchPours')
    this.$store.dispatch('fetchBeerStats')
  }
}
</script>

<style type="scss" scoped>

.stats{
  background-color: white;
  padding-bottom: 100px;
  min-height: 100%;
  color: #333;
}

</style>
