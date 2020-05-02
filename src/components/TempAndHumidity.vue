<template>
  <div class="wrapper" v-if="hasReceivedTempAndHumidity">
    <div class="temperature"><span class="value">{{temperatureF}}</span> <span class="unit">°F</span></div>
    <div class="humidity"><span class="value">{{humidityPercent}}</span> <span class="unit">% humidity</span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TempAndHumidity',
  computed: mapState({
    hasReceivedTempAndHumidity: state => state.hasReceivedTempAndHumidity,
    temperatureF: state => state.temperatureF,
    humidityPercent: state => state.humidityPercent
  })
}
</script>

<style type="scss" scoped>

.wrapper {
  padding: 10px 20px;
  border: 1px solid rgba( 255, 255, 255, 0.05 );
  margin: 20px;
}
.value{
  font-size: 30px;
  font-weight: 700;
  margin-right: 6px;
}

.unit {
  font-size: 16px;
  font-weight: 100;
}

</style>
