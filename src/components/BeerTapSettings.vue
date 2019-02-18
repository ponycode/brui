<template>
  <div class="beerTap">
    <b-form>
      <b-form-group label="Tap Name"
                    label-for="tapName"
                    description="Tap name ( left, right, etc. )">
        <b-form-input type="text"
                      v-model="tap.name"
                      required
                      placeholder="Enter a name for your tap">
        </b-form-input>
      </b-form-group>

      <div class="row">
        <div class="col-md-6 col-md-offset-2">
          <strong>Beer on Tap:</strong>

          <b-form-group label="Name" label-for="beerName">
            <b-form-input id="beerName"
                          type="text"
                          v-model="tap.beer.name"
                          required
                          placeholder="Beer name">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Image" label-for="beerImage">
            <b-form-input id="beerImage"
                          type="text"
                          v-model="tap.beer.imageUrl"
                          required
                          placeholder="Beer image url">
            </b-form-input>
          </b-form-group>

          <b-form-group label="ABV" label-for="abv">
            <b-form-input id="abv" 
                          type="number"
                          v-model="tap.beer.abv"
                          required
                          placeholder="ABV">
            </b-form-input>
          </b-form-group>
          
          <b-form-group label="IBU" label-for="ibu">
            <b-form-input id="ibu" 
                          type="number"
                          v-model="tap.beer.ibu"
                          required
                          placeholder="IBU">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Description" label-for="description">
            <b-form-textarea id="description"
                            v-model="tap.beer.description"
                            placeholder="Beer description"
                            :rows="3"
                            :max-rows="6">
            </b-form-textarea>
          </b-form-group>

        </div>
        <div class="col-md-4">
          <img v-if="tap.beer.imageUrl" :src="tap.beer.imageUrl" class="beerImage"/>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'beerTapSettings',
  props: {
    tap: {
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
