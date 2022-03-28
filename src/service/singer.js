import { get } from './base'

export default function getUserList () {
  return get('/api/getSingerList')
}

export function getSingerDetail (singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid
  })
}
