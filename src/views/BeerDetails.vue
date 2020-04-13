<template>
  <div class="beerDetails pt-3">

    <router-link to="/beers"><font-awesome-icon icon="chevron-left" /> All Beers</router-link>

    <b-form v-on:submit.prevent="onSubmit">
      <div class="row mt-3">
        <b-col md="6">

          <b-form-group label="Beer Name" label-for="beerName">
            <b-form-input 
                          id="beerName"
                          type="text"
                          v-model="name"
                          required
                          placeholder="Beer name">
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

          <b-form-group v-if="beerId" label="Image" label-for="beerImage">
            <div v-if="imageUrl">
              <img :src="imageUrl" class="beerImage" /><br/>
              <b-button variant="danger" class="mt-2" size="sm" @click="deleteImage">Delete Image</b-button>
            </div>
            <b-form-file
              v-else
              v-model="imageFile"
              :state="Boolean(imageFile)"
              placeholder="Choose a image or drop it here..."
              drop-placeholder="Drop image file here..."
              accept="image/*"
            ></b-form-file>
          </b-form-group>
        </b-col>
      </div>
    
      <div class="row mt-4">
        <b-col>
          <b-button variant="default-outline" @click="reset">Reset</b-button>
          <b-button type="submit" variant="primary">{{saveButtonTitle}}</b-button>
        </b-col>
      </div>

    </b-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {deleteBeerImage, addBeerImage } from '../api/beers'

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
      deleteImageUrl: null,
      addImageUrl: null,
      abv: null,
      ibu: null,
      description: null,
      empty: true,
      imageFile: null
    }
  },
  methods: {
    async uploadFile(){
      if( !this.imageFile || !this.addImageUrl ) return

      const { type, name } = this.imageFile

      const result = await addBeerImage ({
        addImageUrl: this.addImageUrl,
        imageFile: this.imageFile
      })

      console.log('FILE UPDATED', type, name, result )
      await this.$store.dispatch('fetchBeerDetails', this.beerId )
    },
    async deleteImage(){
      console.log(`DELETEING IMAGE ${this.deleteImageUrl}`)
      console.log( 'DELETE IMAGE', await deleteBeerImage( this.deleteImageUrl ) )
      await this.$store.dispatch('fetchBeerDetails', this.beerId )
    },
    async onSubmit () {
      if( this.beerId ) {
        await this.$store.dispatch('updateBeerDetails', this.updatedBeer )
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
      this.deleteImageUrl = beer.deleteImageUrl
      this.addImageUrl = beer.addImageUrl
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
    imageFile() {
      this.uploadFile()
    },
    beer: {
      immediate: true,
      handler () {
        if( !this.beerId && this.beer && this.beer.beerId ){
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

.beerDetails {
  background-color: white;
  padding-bottom: 100px;
  height: 100%;
  color: #333;
}

.beerImage {
  max-height: 300px;
  width: auto;
  margin: 0 auto;
}

</style>
