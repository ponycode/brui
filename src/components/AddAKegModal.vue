<template>
  <b-modal id="addAKegModal" title="Add a Keg" ref="modal" size="lg">

    <b-input-group class="">
      <template v-slot:append>
        <b-input-group-text><font-awesome-icon icon="search" /></b-input-group-text>
      </template>
      <b-form-input placeholder="Search for a beer" debounce="500" v-model="searchTerm"></b-form-input>
    </b-input-group>

    <div v-if="searchTerm && this.beers" class="results mt-3">
      <b-list-group v-for="beer in beers" :key="beer.beerId">
        <b-list-group-item href="#" button @click="selectBeer(beer)">{{beer.name}}</b-list-group-item>
      </b-list-group>
    </div>

    <template v-slot:modal-footer="{ ok, cancel, hide }">
       <div></div>
    </template>

  </b-modal>
</template>

<script>
import { getBeerSearch } from '../api/beers'
import  { socket } from '../sockets'

export default {
  name: 'AddAKegModal',
  data () {
    return {
      tapIndex: null,
      searchTerm: null,
      beers: null
    }
  },
  methods: {
    show( tapIndex ){
      this.tapIndex = tapIndex
      this.$refs.modal.show()
    },
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
      this.$store.dispatch( 'putKegOnTap', { tapIndex: this.tapIndex, beerId: beer.beerId, gallons: 5 })
      socket.sendMessage( { type: 'get_keg_statuses' } )
      this.$refs.modal.hide()
    },
  },
  watch: {
    searchTerm () {
      this.performSearch();
    }
  }
}
</script>

<style type="scss" scoped>

</style>
