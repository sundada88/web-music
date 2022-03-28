import { PLAY_MODE } from '../assets/js/constant'

const state = {
  // 顺序播放列表
  sequenceList: [],
  // 播放列表
  playList: [],
  // 是否正在播放
  playing: false,
  // 播放模式
  playMode: PLAY_MODE.sequence,
  // 当前播放索引
  currentIndex: 0,
  // 播放状态
  fullScreen: false
}

export default state
