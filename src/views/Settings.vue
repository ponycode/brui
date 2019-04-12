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
import {mapState} from 'vuex'

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
      tapNames: []
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


</style>
