<template>
  <div class="beerOnTap text-center">
    <h2>{{beer.name}}</h2>
    <div class="beerImage">
      <img v-if="beer.imageUrl" :src="beer.imageUrl" />
    </div>
    <div><span class="spec">{{beer.abv}}% <span class="unit">ABV</span></span>, <span class="spec">{{beer.ibu}} <span class="unit">IBU</span></span></div>
    <p class='description'>{{beer.description}}</p>
  </div>
</template>

<script>
export default {
  name: 'beerOnTap',
  props: {
    beer: {
      type: Object,
      required: true
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
  margin-right: 6px;
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
