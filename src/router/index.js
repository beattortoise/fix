import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
