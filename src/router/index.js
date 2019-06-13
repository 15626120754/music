import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/components/index/index'
import MusicMall from '@/components/music-mall/music-mall'
import Register from '@/components/register/register'
import KtvEntry from '@/components/ktv-entry/ktv-entry'
import MakeManage from '@/components/make-manage/make-manage'

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
    },
    {
      path: '/ktv-entry',
      name: 'KtvEntry',
      component: KtvEntry
    },
    {
      path: '/make-manage',
      name: 'MakeManage',
      component: MakeManage
    }
  ]
})
