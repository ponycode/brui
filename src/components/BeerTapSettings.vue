<template>
  <div class="beerTap">

    <div class="row ml-5 mt-5">
      <div class="col-md-6">
        <div v-if="beer">
          <b-card
            :title="beer.name"
            :img-src="beer.imageUrl"
            img-top
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{beer.description}}
            </b-card-text>
            <b-button href="#" variant="danger" size="sm" @click="removeFromTap">Remove from Tap</b-button>
          </b-card>
        </div>
        <div v-else>

          <div class="emptyTap">
            <h2>Empty Tap</h2>
          </div>

          <b-input-group class="mt-5">
            <template v-slot:append>
              <b-input-group-text><font-awesome-icon icon="search" /></b-input-group-text>
            </template>
            <b-form-input placeholder="Search for a beer" debounce="500" v-model="searchTerm"></b-form-input>
          </b-input-group>

          <div v-if="searchTerm && this.beers" class="results mt-3">
            <b-list-group v-for="beer in beers" :key="beer.beerId">
              <b-list-group-item button @click="selectBeer(beer)">{{beer.name}}</b-list-group-item>
            </b-list-group>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBeerSearch } from '../api/beers'

export default {
  name: 'beerTapSettings',
  data () {
    return {
      searchTerm: null,
      beers: null
    }
  },
  props: {
    tap: {
      type: Object,
      required: true
    }
  },
  methods: {
    async performSearch () {
      if( this.searching ) return
      
      if( !this.searchTerm || this.searchTerm.length < 3 ){
        this.beers = null
        return
      }

      try{
        this.searching = true
        this.beers = await getBeerSearch( this.searchTerm )
        this.searching = false
      }catch( e ){
        this.searching = false
        this.beers = null
      }
    },
    selectBeer ( beer ) {
      this.$store.dispatch( 'putKegOnTap', { tapIndex: this.tap.tapIndex, beerId: beer.beerId, gallons: 5 })
    },
    removeFromTap () {
      this.$store.dispatch( 'removeKegFromTap', { tapIndex: this.tap.tapIndex })
    }
  },
  computed: {
    beer () {
      if( !this.tap ) return null
      if( !this.tap.Keg ) return null
      return this.tap.Keg.Beer;
    }
  },
  watch: {
    searchTerm () {
      this.performSearch();
    }
  }
}
</script>

<style type="scss" scoped>

.beerImage img {
  max-height: 100px;
  width: auto;
  margin: 0 auto;
}

.emptyTap {
  border: 1px dashed silver;
  padding: 10px;
  border-radius: 4px;
  max-width: 20rem;
  text-align: center;
}

</style>
