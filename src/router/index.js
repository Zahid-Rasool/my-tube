import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: App
    }
  ]
})

export default router
