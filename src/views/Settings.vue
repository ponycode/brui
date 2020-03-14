<template>
  <div class="settings">
    <br/>

    <b-form v-on:submit.prevent="onSubmit">
      <b-row>
        <b-col md="4">
            <b-form-group label="Number of Taps">
              <b-form-select v-model="numberOfTaps" :options="numberOfTapsOptions" class="mb-3" />
            </b-form-group>
        </b-col>
      </b-row>

      <b-row v-for="index in numberOfTaps" :key="index">
        <b-col md="4">
          <b-form-group :label="` Tap ${index} Name`" :label-for="`tap-${index}-name`"> 
            <b-input-group>
              <b-input :id="`tap-${index}-name`" v-model="tapNames[index - 1]"/>
              <b-input-group-append>
                <b-button variant="outline-success" @mousedown="pourSimulatorListener.startPour(index - 1)" @mouseup="pourSimulatorListener.endPour(index - 1)">Simulate Pour</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4">
          <b-button type="submit" variant="primary">Save</b-button>
        </b-col>
      </b-row>

    </b-form>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import PourSimulatorListener from '../lib/pourSimulatorBindings'
const pourSimulatorListener = new PourSimulatorListener()

export default {
  name: 'settings',
  data () {
    return {
      numberOfTapsOptions: [
        { value: 1, text: 'One, single tap kegarator' },
        { value: 2, text: 'Two, dual tap kegarator' },
        { value: 3, text: 'Triple tap kegarator' }
      ],
      numberOfTaps: 1,
      tapNames: [],
      pourSimulatorListener
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
    })
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('saveSettings', {
        numberOfTaps: this.numberOfTaps,
        tapNames: this.tapNames
      })
      this.$toasted.success('Settings Updated', { singleton: true }).goAway(3000)
    }
  },
  watch: {
    settings () {
      if( !this.settings ) return 
      this.numberOfTaps = this.settings.numberOfTaps
      this.tapNames = this.settings.tapNames
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchSettings')
  }
}
</script>

<style type="scss" scoped>

.settings{
  background-color: white;
  padding-bottom: 100px;
  height: 100%;

  color: #333;
}

</style>
