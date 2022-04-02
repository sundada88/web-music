import { get } from './base'

export function processSongs (songs) {
  if (!songs.length) return Promise.resolve(songs)
  return get('/api/getSongsUrl', {
    mid: songs.map(song => song.mid)
  }).then(result => {
    const map = result.map
    return songs
      .map(song => {
        song.url = map[song.mid]
        return song
      })
      .filter(song => {
        return song.url.indexOf('vkey') > -1
      })
  })
}

const lyricMap = {}

export function getLyric (song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const { mid } = song
  if (lyricMap[mid]) return Promise.resolve(lyricMap[mid])
  return get('/api/getLyric', { mid }).then(result => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    console.log('lyric ---> ', lyric)
    lyricMap[mid] = lyric
    return lyric
  })
}
