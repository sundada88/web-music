import { load } from '../assets/js/arr-store'
import { FAVORITE_KEY, PLAY_MODE } from '../assets/js/constant'

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
  fullScreen: false,
  // 收藏列表
  favoriteList: load(FAVORITE_KEY) || []
}

export default state
