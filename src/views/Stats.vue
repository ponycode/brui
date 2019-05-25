<template>
  <div class="stats">
    <br/>
    <h2>Pour History</h2>
    <table class="table">
      <tr>
        <th>Date</th>
        <th>Floz. / Milliliters</th>
        <th>Beer</th>
        <th>Duration</th>
        <th>Ticks</th>
      </tr>
      <tr v-for="pour in pours" :key="pour.pourId">
        <td>{{pour.createdAt | formatDate}}</td>
        <td>{{Math.round( (pour.milliliters * 0.0338 ) * 100 ) / 100}} floz / {{pour.milliliters}} ml</td>
        <td>{{pour.beerName}}</td>
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
      pours: state => state.pours
    })
  },
  async mounted () {
    await this.$store.dispatch('fetchPours')
  }
}
</script>

<style type="scss" scoped>

</style>
