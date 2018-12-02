<template>
  <div class="beerOnTap text-center">
    <h2>{{beer.name}}</h2>
    <img class="beerImage" :src="beer.imageUrl" />
    <h5>{{beer.abv}}% ABV, {{beer.ibu}} IBU</h5>
    <p>{{beer.description}}</p>
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

.beerImage {
  max-height: 300px;
  width: auto;
  margin: 0 auto;
}

</style>
