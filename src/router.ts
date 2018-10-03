import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: () => import('./views/Tweets.vue')
    }, 
    {
      path: '/about',
      name: 'about', 
      component: () => import('./views/about.vue')
    },
    {
      path: '/search-advanced',
      name: 'search_advanced',
      component: () => import('./views/SearchAdvanced.vue')
    }
  ]
})