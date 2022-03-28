import { PLAY_MODE } from '../assets/js/constant'
import { shuffle } from '../assets/js/util'

// 顺序播放
export function selectPlay ({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingStatus', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
  commit('setCurrentIndex', index)
}

// 随机播放
export function randomPlay ({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingStatus', true)
  commit('setFullScreen', true)
  // 洗牌
  commit('setPlayList', shuffle(list))
  commit('setCurrentIndex', 0)
}
