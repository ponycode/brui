<template>
  <div class="beerOnTap text-center" v-if="beer && !beer.empty">
    <h2 class="mb-1">{{beer.name}}</h2>
    <b-button class="mt-0 mb-2" v-if="!fullscreen" variant="outline-danger" size="sm" v-b-modal="'removeKegConfirmation-' + tapIndex"><font-awesome-icon icon="times-circle" class="mr-2"/>Remove Keg</b-button>
    <div class="beerImage mt-3">
      <img v-if="beer.imageUrl" :src="beer.imageUrl" />
    </div>
    <div>
      <span v-if="beer.abv" class="spec">{{beer.abv}}% <span class="unit">ABV</span></span>
      <span v-if="beer.ibu" class="spec">{{beer.ibu}} <span class="unit">IBU</span></span>
    </div>
    <p class='description'>{{beer.description}}</p>

    <b-modal :id="'removeKegConfirmation-' + tapIndex" title="Remove Keg?" ref="modal" size="lg" ok-title="Yes, Remove Keg" ok-variant="danger" @ok="removeKeg" modal-class="removeKegConfirmation">
      <h3>{{beer.name}}</h3>
      <p class="mt-3">
        Removing this keg will finalize all pour reporting.
      </p>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'kegOnTap',
  props: {
    tapIndex: {
      type: Number,
      required: true
    },
    keg: {
      type: Object,
      required: false
    }
  },
  computed: {
    ...mapState({
      fullscreen: state => state.fullscreen
    }),
    beer () {
      if( !this.keg ) return null
      return this.keg.Beer
    }
  },
  methods: {
    removeKeg(){
      this.$store.dispatch( 'removeKegFromTap', { tapIndex: this.tapIndex })
    }
  }
}
</script>

<style type="scss" scoped>

h2{
  font-weight: 400;
  margin-bottom: 20px;
}

h5 {
  font-weight: 200;
  margin-bottom: 20px;
}

.beerImage {
  height: 250px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}

.beerImage img {
  width: 100%;
  height: auto;
  margin: auto;
  max-width: 80%;
}

.spec {
  font-size: 30px;
  font-weight: 300;
  margin-right: 14px;
}

.spec .unit {
  font-size: 20px;
  font-weight: 100;
  color: rgba( 255, 255, 255, 0.8 );
}

.description {
  margin-top: 40px;
  font-size: 20px;
  font-weight: 300;
  color: rgba( 255, 255, 255, 0.8 );
}

</style>

<style type="scss">

.removeKegConfirmation{
  color: #333;
}

</style>
