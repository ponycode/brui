<template>
  <div class="container">
    <bar-chart
      v-if="loaded && chartData"
      :chartdata="chartData"
      :options="options"/>
  </div>
</template>

<script>
import BarChart from './BarChart'
import { mapState } from 'vuex'
import { ClassicCyclic13 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau';

export default {
  name: 'PoursChart',
  components: { BarChart },
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
      },
      plugins: {
        colorschemes: {
          scheme: ClassicCyclic13
        }
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
