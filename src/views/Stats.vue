<template>
  <div class="stats">
    <br/>
    <h2>Pour History</h2>
    <table class="table">
      <tr>
        <th>Date</th>
        <th>Duration Seconds</th>
        <th>Tick Count</th>
      </tr>
      <tr v-for="pour in pours" :key="pour.pourId">
        <td>{{pour.createdAt | formatDate}}</td>
        <td>{{pour.durationSeconds}}</td>
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
