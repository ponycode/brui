<template>
  <div class="beers">
    <br/>
    <h1>Beers</h1>
    
    <b-table v-if="beers" class="beerTable" striped hover :items="beers" :fields="fields" :no-select-on-click="true" @row-clicked="showDetails">
      <template v-slot:head(name)>
        <div class="d-flex align-items-center justify-content-between">
            Beer Name: <b-button size="xs" variant="primary" to="/beers/new">New Beer</b-button>
        </div>
      </template>
    </b-table>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'beers',
  data () {
    return {
      fields: [{ key: 'name', label: 'Full Name' }]
    };
  },
  computed: {
    ...mapState({
      beers: state => state.mostRecentBeers
    })
  },
  methods: {
    showDetails ({ beerId }) {
      this.$router.push({ name: 'beerDetails', params: { beerId } })
    },
    newBeer () {
      this.$router.push({ name: 'beerDetails' })
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchMostRecentBeers')
  }
}
</script>

<style type="scss" scoped>

.beers{
  background-color: white;
  padding-bottom: 100px;
  min-height: 100%;
  color: #333;
}

.beerTable td {
  cursor: pointer;
}

</style>
