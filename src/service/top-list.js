import { get } from './base'

export function getTopList () {
  return get('/api/getTopList')
}

export function getTopDetail (top) {
  console.log(top)
  return get('/api/getTopDetail', {
    id: top.id,
    period: top.period
  })
}
