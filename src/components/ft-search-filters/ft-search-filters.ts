import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FtSearchFilters',
  components: {},
  data() {
    return {
      sortByValues: ['relevance', 'rating', 'upload_date', 'view_count'],
      timeValues: ['', 'hour', 'today', 'week', 'month', 'year'],
      typeValues: ['all', 'video', 'channel', 'playlist', 'movie'],
      durationValues: ['', 'short', 'medium', 'long']
    }
  },
  computed: {
    searchSettings() {
      return true //this.$store.getters.getSearchSettings
    },

    filterValueChanged() {
      return [
        this.$refs.sortByRadio.selectedValue !== this.sortByValues[0],
        this.$refs.timeRadio.selectedValue !== this.timeValues[0],
        this.$refs.typeRadio.selectedValue !== this.typeValues[0],
        this.$refs.durationRadio.selectedValue !== this.durationValues[0]
      ].some((bool) => bool === true)
    },

    sortByLabels() {
      return [
        'Most Relevant', // this.$t('Search Filters.Sort By.Most Relevant')
        'Rating', // this.$t('Search Filters.Sort By.Rating')
        'Upload Date', // this.$t('Search Filters.Sort By.Upload Date')
        'View Count' // this.$t('Search Filters.Sort By.View Count')
      ]
    },

    timeLabels() {
      return [
        'Any Time', // this.$t('Search Filters.Time.Any Time')
        'Last Hour', // this.$t('Search Filters.Time.Last Hour')
        'Today', // this.$t('Search Filters.Time.Today')
        'This Week', // this.$t('Search Filters.Time.This Week')
        'This Month', // this.$t('Search Filters.Time.This Month')
        'This Year' // this.$t('Search Filters.Time.This Year')
      ]
    },

    typeLabels() {
      return [
        'All Types', //this.$t('Search Filters.Type.All Types')
        'Videos', //this.$t('Search Filters.Type.Videos')
        'Channels', //this.$t('Search Filters.Type.Channels')
        'Playlists', //this.$t('Playlists')
        'Movies' //this.$t('Search Filters.Type.Movies')
      ]
    },

    durationLabels() {
      return [
        'All Durations', //this.$t('Search Filters.Duration.All Durations')
        'Short', //this.$t('Search Filters.Duration.Short (< 4 minutes)')
        'Medium', //this.$t('Search Filters.Duration.Medium (4 - 20 minutes)')
        'Long' //this.$t('Search Filters.Duration.Long (> 20 minutes)')
      ]
    }
  },
  methods: {
    isVideoOrMovieOrAll(type: string) {
      return type === 'video' || type === 'movie' || type === 'all'
    },

    updateSortBy() {
      // updateSortBy(value){
      //this.$store.commit('setSearchSortBy', value)
      this.$emit('filteredValueUpdated', this.filterValueChanged)
    },

    updateTime() {
      // updateTime(value){
      if (!this.isVideoOrMovieOrAll(this.searchSettings.type)) {
        const typeRadio = this.$refs.typeRadio
        typeRadio.updateSelectedValue('all')
        // this.$store.commit('setSearchType','all)
      }
      // this.$store.commit('setSearchType', value)
      this.$emit('filterValueUpdated', this.filterValueChanged)
    },

    updateType(value: string) {
      if (value === 'channel' || value === 'playlist') {
        const timeRadio = this.$refs.timeRadio
        const durationRadio = this.$refs.durationRadio
        const sortByRadio = this.$refs.sortByRadio
        timeRadio.updateSelectedValue('')
        durationRadio.updateSelectedValue('')
        sortByRadio.updateSelectedValue(this.sortByValues[0])
        // this.$store.commit('setSearchTime','')
        // this.$store.commit('setSearchDuration','')
        // this.$store.commit('setSearchSortBy', this.sortByValue[0])
      }
      // this.$store.commit('setSearchType', value)
      this.$emit('filterValueUpdated', this.filterValueChanged)
    },

    updateDuration(value: string) {
      if (value !== '' && !this.isVideoOrMovieOrAll(this.searchSettings.type)) {
        const typeRadio = this.$refs.typeRadio
        typeRadio.updateSelectedValue('all')
        this.updateType('all')
      }
      //this.$store.commit('setSearchDuration', value)
      this.$emit('filterValueUpdated', this.filterValueChanged)
    }
  }
})
