<template>
  <div class="stats">

    <br/>
    <h2>Stats</h2>

    <pours-chart-container></pours-chart-container>

    <table class="table mt-3">
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

    <br/>
    <h2>Pour History</h2>
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
import PoursChartContainer from '../components/PoursChartContainer'

export default {
  name: 'stats',
  components: { PoursChartContainer },
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

</style>
