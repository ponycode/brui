<template>
  <div class="settings">
    <br/>
    <b-row>
      <b-col md="4">
         <b-form @submit="onSubmit">
          <b-form-group label="Number of Taps">
            <b-form-select v-model="numberOfTaps" :options="numberOfTapsOptions" class="mb-3" />
          </b-form-group>
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
      </b-col>
    </b-row>
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
      ]
    };
  },
  methods: {
    onSubmit ( e ) {
      e.preventDefault()
      saveSettings({
        numberOfTaps: this.numberOfTaps
      })
    }
  },
  async mounted () {
    const settings = await getSettings();
    console.log('settings', settings);
    this.numberOfTaps = settings.numberOfTaps;
  }
}
</script>

<style type="scss" scoped>


</style>
