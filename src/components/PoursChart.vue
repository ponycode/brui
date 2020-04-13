<template>
  <div>
    <h3>Fl. oz Poured, last 3 months</h3>
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
import moment from 'moment-timezone'

export default {
  name: 'PoursChart',
  components: { BarChart },
  data: () => ({
    loaded: false,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            title: ( [firstToolTipItem] ) => {
              return 'Pours on ' + firstToolTipItem.xLabel
            },
            label: ( tooltipItem, data ) => {
              const beerName = data.datasets[tooltipItem.datasetIndex].label || '';
              return `${beerName}: ${tooltipItem.yLabel} fl. oz`;
            }
        }
      },
      legend: {
        position: 'right'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
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
