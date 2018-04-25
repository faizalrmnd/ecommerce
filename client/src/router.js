import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Catalogue from './views/Catalogue.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: Catalogue
    }
  ]
})
