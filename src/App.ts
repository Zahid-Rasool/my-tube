import { defineComponent } from 'vue'
import TopNav from './components/top-nav/top-nav.vue'

export default defineComponent({
  name: 'App',
  components: {
    TopNav
  },
  data() {
    return {
      dataready: true
    }
  }
})
