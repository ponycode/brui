<template>
  <div class="beerTap">
    <!--
    <b-form  v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-6 col-md-offset-2" >
          <b-form-checkbox
            v-model="empty"
            class="emptyCheckbox"
          >
            Empty Tap
          </b-form-checkbox>

          <div v-if="!empty">

            <b-form-group label="Name" label-for="beerName">
              <b-form-input 
                            type="text"
                            v-model="name"
                            required
                            placeholder="Beer name">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Image" label-for="beerImage">
              <b-form-input 
                            type="text"
                            v-model="imageUrl"
                            required
                            placeholder="Beer image url">
              </b-form-input>
            </b-form-group>

            <b-form-group label="ABV" label-for="abv">
              <b-form-input 
                            type="number"
                            v-model="abv"
                            required
                            placeholder="ABV">
              </b-form-input>
            </b-form-group>
            
            <b-form-group label="IBU" label-for="ibu">
              <b-form-input 
                            type="number"
                            v-model="ibu"
                            required
                            placeholder="IBU">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Description" label-for="description">
              <b-form-textarea 
                              v-model="description"
                              placeholder="Beer description"
                              :rows="3"
                              :max-rows="6">
              </b-form-textarea>
            </b-form-group>

          </div>

        </div>
        <div class="col-md-4">
          <img v-if="imageUrl && !empty" :src="imageUrl" class="beerImage"/>
        </div>
      </div>
    
      <b-button type="submit" variant="primary">Save</b-button>

    </b-form>
    -->
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
            <b-button href="#" variant="danger" size="sm">Remove from Tap</b-button>
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
      alert( beer.name )
    }
  },
  computed: {
    beer () {
      if( !this.tap ) return null;
      return this.tap.beer;
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
