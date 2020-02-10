<template>
  <div class="container-fluid menuContent">
    <div class="row beerOnTapRow">
      <div class="col text-center beerOnTapCol" v-for="tap in taps" :key="tap.tapIndex">
        <h1>{{tap.tapName}}</h1>
        <div class="beerOnTapContainer">
          <keg-on-tap :keg="tap.Keg"></keg-on-tap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KegOnTap from '@/components/KegOnTap'
import { mapState } from 'vuex'

export default {
  name: 'menu',
  components: {
    KegOnTap
  },
  computed: mapState({
    taps: state => state.taps
  }),
  mounted () {
    this.$store.dispatch('fetchTaps')
  }
}
</script>

<style type="scss" scoped>

.menuContent {
  background: rgb(73,73,73);
  background: radial-gradient(circle, rgba(73,73,73,1) 0%, rgba(0,0,0,1) 100%);
  height: 100vh;
  color: white;
}

h1 {
  color: #ccc;
  font-weight: 100;
  border-bottom: 1px solid rgba( 255, 255, 255, 0.2 );
  padding: 12px 0;
  margin-bottom: 30px;
  font-size: 1.8em;
}

.beerOnTapRow, .beer{
  height: 100%;
}

.beerOnTapContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
