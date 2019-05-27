<template>
  <div class="stats">

    <br/>
    <h2>Stats</h2>
    <table class="table">
      <tr>
        <th>Beer</th>
        <th>Gallons Poured</th>
        <th>Number of Pours</th>
        <th>Days on Tap</th>
      </tr>
      <tr v-for="beerStat in beerStats" :key="beerStat.beerId">
        <td>{{beerStat.name}}</td>
        <td>{{beerStat.gallons}}</td>
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

export default {
  name: 'stats',
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
