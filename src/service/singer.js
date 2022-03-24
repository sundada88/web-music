import { get } from './base'

export default function getUserList () {
  return get('/api/getSingerList')
}
