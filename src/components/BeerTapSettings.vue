<template>
  <div class="beerTap">
    <b-form  v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-6 col-md-offset-2" >
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
        <div class="col-md-4">
          <img v-if="imageUrl" :src="imageUrl" class="beerImage"/>
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
  data () {
    return {
      name: null,
      imageUrl: null,
      abv: null,
      ibu: null,
      description: null
    }
  },
  props: {
    tap: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('saveBeer', { beer: this.beer, tapIndex: this.tap.tapIndex })
      this.$toasted.success('Beer Saved', { singleton: true }).goAway(3000)
    }
  },
  computed: {
    beer () {
      const b = {};
      b.name = this.name;
      b.imageUrl = this.imageUrl;
      b.abv = this.abv;
      b.ibu = this.ibu;
      b.description = this.description;
      return b;
    }
  },
  watch: {
    tap: {
      immediate: true,
      handler () {
        if (!this.tap ) return;
        const {beer} = this.tap;
        if (!beer) return
        this.name = beer.name;
        this.imageUrl = beer.imageUrl;
        this.abv = beer.abv;
        this.ibu = beer.ibu;
        this.description = beer.description;
      }
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
