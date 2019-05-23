import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/components/index/index'
import MusicMall from '@/components/music-mall/music-mall'
import Register from '@/components/register/register'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex
    },
    {
      path: '/music-mall',
      name: 'MusicMall',
      component: MusicMall
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
