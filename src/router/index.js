import { createRouter, createWebHashHistory } from 'vue-router'
import recommend from '@/views/recommend'
import singer from '@/views/singer'
import tipList from '@/views/top-list'
import search from '@/views/search'
import singerDetail from '@/views/singer-detail'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: recommend
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
    component: tipList
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
