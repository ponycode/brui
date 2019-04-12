<template>
  <div class="settings">
    <br/>

    <b-form @submit="onSubmit">

      <b-row>
        <b-col md="4">
            <b-form-group label="Number of Taps">
              <b-form-select v-model="numberOfTaps" :options="numberOfTapsOptions" class="mb-3" />
            </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4">
          <b-form-group :label="'Tap ' + index + ' Name'" v-for="index in numberOfTaps" :key="index">
            <b-input v-model="tapNames[index - 1]" class="mb-3" />
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
import { saveSettings, getSettings } from '../api/settings.js'

export default {
  name: 'settings',
  data () {
    return {
      numberOfTaps: 3,
      numberOfTapsOptions: [
        { value: 1, text: 'One, single tap kegarator' },
        { value: 2, text: 'Two, dual tap kegarator' },
        { value: 3, text: 'Triple tap kegarator' }
      ],
      tapNames: []
    };
  },
  methods: {
    onSubmit ( e ) {
      e.preventDefault()
      saveSettings({
        numberOfTaps: this.numberOfTaps,
        tapNames: this.tapNames
      })
    }
  },
  watch: {
    numberOfTaps () {
      this.tapNames = this.tapNames.slice( 0, this.numberOfTaps )
    }
  },
  async mounted () {
    const settings = await getSettings();
    console.log('settings', settings);
    this.numberOfTaps = settings.numberOfTaps || 1;
    this.tapNames = settings.tapNames || [];
  }
}
</script>

<style type="scss" scoped>


</style>
