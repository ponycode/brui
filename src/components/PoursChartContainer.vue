<template>
  <div class="container">
    <pours-chart
      v-if="loaded && chartData"
      :chartdata="chartData"
      :options="options"/>
  </div>
</template>

<script>
import PoursChart from './PoursChart.vue'
import { mapState } from 'vuex'

export default {
  name: 'PoursChartContainer',
  components: { PoursChart },
  data: () => ({
    loaded: false,
    options: {
      title: {
        display: true,
        text: 'Pours over last 3 months'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: 'YYYY-MM-DD',
            unit: 'day'
          },
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  }),
  computed: {
    ...mapState({
      chartData: state => state.poursChartData
    })
  },
  async mounted () {
    this.loaded = false
    await this.$store.dispatch('fetchPoursChartData')
    this.loaded = true
  }
}
</script>
