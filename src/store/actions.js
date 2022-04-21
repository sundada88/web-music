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

export function changeMode ({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id
  // 改变模式
  commit('setPlayMode', mode)
  // 改变播放列表
  if (mode === PLAY_MODE.random) {
    commit('setPlayList', shuffle(state.sequenceList))
  } else {
    commit('setPlayList', state.sequenceList)
  }
  const index = state.playList.findIndex(song => song.id === currentId)
  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}

export function removeSong ({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice()
  const playList = state.playList.slice()

  const sequenceIndex = findIndex(sequenceList, song)
  const playIndex = findIndex(playList, song)

  if (sequenceIndex < 0 || playIndex < 0) {
    return
  }

  // 更新currentIndex
  let currentIndex = state.currentIndex
  if (playIndex < currentIndex || currentIndex + 1 === playList.length) {
    currentIndex--
  }

  sequenceList.splice(sequenceIndex, 1)
  playList.splice(playIndex, 1)
  commit('setSequenceList', sequenceList)
  commit('setPlayList', playList)
  commit('setCurrentIndex', currentIndex)
  if (!playList.length) {
    commit('setPlayingStatus', false)
  }
}

export function clearSongList ({ commit }) {
  commit('setSequenceList', [])
  commit('setPlayList', [])
  commit('setCurrentIndex', 0)
  commit('setPlayingStatus', false)
}

export function addSong ({ commit, state }, song) {
  const playList = state.playList.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const playIndex = findIndex(playList, song)
  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    playList.push(song)
    currentIndex = playList.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }
  commit('setSequenceList', sequenceList)
  commit('setPlayList', playList)
  commit('setCurrentIndex', currentIndex)

  commit('setPlayingStatus', true)
  commit('setFullScreen', true)
}

function findIndex (list, song) {
  return list.findIndex(item => item.id === song.id)
}
