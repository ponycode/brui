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
          <b-media>
            <template v-slot:aside>
              <b-img :blank="!beer.imageUrl" blank-color="#ccc" width="100" :src="beer.imageUrl" />
            </template>
            <h5 class="mt-0 mb-1">{{beer.name}}</h5>
            <p class="mb-0">
              {{beer.description}}
            </p>
          </b-media>
          <b-button class="mt-5" variant="danger">Remove Beer from Tap</b-button>
        </div>
        <div v-else>
          NO BEER!

          <b-input-group class="mt-3">
            <template v-slot:append>
              <b-input-group-text><font-awesome-icon icon="search" /></b-input-group-text>
            </template>
            <b-form-input placeholder="Search for a beer" debounce="500" v-model="searchTerm"></b-form-input>
          </b-input-group>

          <div v-if="searchTerm && this.beers" class="results mt-3">
            <ul class="list-unstyled mt-3" v-for="beer in beers" :key="beer.beerId">
              <b-media tag="li">
                <template v-slot:aside>
                  <b-img :blank="!beer.imageUrl" blank-color="#ccc" width="60" :src="beer.imageUrl" />
                </template>
                <h5 class="mt-0 mb-1">{{beer.name}}</h5>
              </b-media>
            </ul>
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

</style>
