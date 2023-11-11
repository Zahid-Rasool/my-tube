import { defineComponent } from 'vue'
import FtInput from '../ft-input/ft-input.vue'
import ftSearchFilters from '../ft-search-filters/ft-search-filters'

export default defineComponent({
  name: 'TopNav',
  components: {
    'ft-input': FtInput,
    'ft-search-filters': ftSearchFilters
  },
  data() {
    return {
      hideSearchBar: false,
      hideHeaderLogo: false,
      showSearchContainer: true
    }
  }
})
