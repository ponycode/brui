<template>
  <div class="beerDetails mt-3">

    <router-link to="/beers"><font-awesome-icon icon="chevron-left" /> All Beers</router-link>

    <b-form v-on:submit.prevent="onSubmit">
      <div class="row mt-3">


        <div class="col-md-6 col-md-offset-2" >
          <div>

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
                            placeholder="Beer image url">
              </b-form-input>
            </b-form-group>

            <b-form-group label="ABV" label-for="abv">
              <b-form-input 
                            v-model="abv"
                            placeholder="ABV">
              </b-form-input>
            </b-form-group>
            
            <b-form-group label="IBU" label-for="ibu">
              <b-form-input 
                            type="number"
                            v-model="ibu"
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
    
      <b-button variant="default-outline" @click="reset">Reset</b-button>
      <b-button type="submit" variant="primary">{{saveButtonTitle}}</b-button>

    </b-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'beerDetails',
  props: {
    beerId: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      name: null,
      imageUrl: null,
      abv: null,
      ibu: null,
      description: null,
      empty: true
    }
  },
  methods: {
    async onSubmit () {
      if( this.beerId ) {
        const beer = await this.$store.dispatch('updateBeerDetails', this.updatedBeer )
        this.$toasted.success('Beer Updated', { singleton: true }).goAway(3000)
      } else {
        await this.$store.dispatch('createNewBeer', this.updatedBeer )
        this.$toasted.success('Beer Created', { singleton: true }).goAway(3000)
      }
    },
    reset () {
      const beer = this.beer
      if( !beer ) return

      this.name = beer.name
      this.imageUrl = beer.imageUrl
      this.abv = beer.abv
      this.ibu = beer.ibu
      this.description = beer.description
    }
  },
  computed: {
    ...mapState({
      beer: state => state.beerDetails
    }),
    saveButtonTitle () {
      if ( this.beerId ) {
        return 'Update Beer'
      } else { 
        return 'Create Beer'
      }
    },
    updatedBeer () {
      const b = {};
      if( this.beerId ) b.beerId = this.beerId;
      b.name = this.name;
      b.imageUrl = this.imageUrl;
      b.abv = this.abv;
      b.ibu = this.ibu;
      b.description = this.description;
      return b;
    }
  },
  watch: {
    beer: {
      immediate: true,
      handler () {
        if( !this.beerId && this.beer.beerId ){
          // created a new beer - update url and UI
          return this.$router.push({ name: 'beerDetails', params: { beerId: this.beer.beerId } })
        }
        this.reset() // copy data into local data so it can be edited
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchBeerDetails', this.beerId )
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
