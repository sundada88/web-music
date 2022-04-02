const mutations = {
  // 修改播放状态
  setPlayingStatus (state, playing) {
    state.playing = playing
  },
  // 设置顺序播放列表
  setSequenceList (state, list) {
    state.sequenceList = list
  },
  // 设置播放列表
  setPlayList (state, list) {
    state.playList = list
  },
  // 设置播放模式
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  // 设置当前播放索引
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  // 设置全屏
  setFullScreen (state, fullScreen) {
    state.fullScreen = fullScreen
  },
  // 设置收藏列表
  setFavoriteList (state, list) {
    state.favoriteList = list
  },
  addLyric (state, { song, lyric }) {
    state.sequenceList.map(item => {
      if (item.mid === song.mid) {
        item.lyric = lyric
      }
      return item
    })
  }
}

export default mutations
