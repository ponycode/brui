<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col text-center" v-for="tap in taps" :key="tap.name">
        <h1>{{tap.name}}</h1>
        <beer-on-tap :beer="tap.beer"></beer-on-tap>
      </div>
    </div>
  </div>
</template>

<script>
import BeerOnTap from '@/components/BeerOnTap'
import { mapState } from 'vuex'

export default {
  name: 'menu',
  components: {
    BeerOnTap
  },
  computed: mapState({
    taps: state => state.taps
  })
}
</script>
