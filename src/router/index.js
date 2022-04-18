import { createRouter, createWebHashHistory } from 'vue-router'
import recommend from '@/views/recommend'
import singer from '@/views/singer'
import tipList from '@/views/top-list'
import search from '@/views/search'
import singerDetail from '@/views/singer-detail'
import album from '@/views/album'
import topDetail from '@/views/top-detail'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: ':id',
        component: album
      }
    ]
  },
  {
    path: '/singer',
    component: singer,
    children: [
      {
        path: ':id',
        component: singerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: tipList,
    children: [
      {
        path: ':id',
        component: topDetail
      }
    ]
  },
  {
    path: '/search',
    component: search
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
