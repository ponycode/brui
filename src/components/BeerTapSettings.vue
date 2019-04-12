<template>
  <div class="beerTap">
    <b-form  v-on:submit.prevent="onSubmit" v-if="beer">
      <div class="row">
        <div class="col-md-6 col-md-offset-2" >
          <b-form-group label="Name" label-for="beerName">
            <b-form-input id="beerName"
                          type="text"
                          v-model="beer.name"
                          required
                          placeholder="Beer name">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Image" label-for="beerImage">
            <b-form-input id="beerImage"
                          type="text"
                          v-model="beer.imageUrl"
                          required
                          placeholder="Beer image url">
            </b-form-input>
          </b-form-group>

          <b-form-group label="ABV" label-for="abv">
            <b-form-input id="abv" 
                          type="number"
                          v-model="beer.abv"
                          required
                          placeholder="ABV">
            </b-form-input>
          </b-form-group>
          
          <b-form-group label="IBU" label-for="ibu">
            <b-form-input id="ibu" 
                          type="number"
                          v-model="beer.ibu"
                          required
                          placeholder="IBU">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Description" label-for="description">
            <b-form-textarea id="description"
                            v-model="beer.description"
                            placeholder="Beer description"
                            :rows="3"
                            :max-rows="6">
            </b-form-textarea>
          </b-form-group>

        </div>
        <div class="col-md-4">
          <img v-if="beer.imageUrl" :src="beer.imageUrl" class="beerImage"/>
        </div>
      </div>
    
      <b-button type="submit" variant="primary">Save</b-button>

    </b-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'beerTapSettings',
  props: {
    tapIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      beers: state => state.beers
    }),
    beer () {
      if( !this.beers ) return null
      for( const beer of this.beers ){
        if( beer.tapIndex === this.tapIndex ) return beer.beer
      }
      return null
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('saveBeer', { beer: { name: 'beer1' }, tapIndex: this.tap.index })
    }
  }
}
</script>

<style type="scss" scoped>

.beerImage {
  max-height: 300px;
  width: auto;
  margin: 0 auto;
}

</style>
