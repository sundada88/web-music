import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Lyric from 'lyric-parser'
import { getLyric } from '../../service/song'

export default function usrLyric ({ songReady, currentTime }) {
  const store = useStore()
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)

  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async newSong => {
    if (!newSong.url || !newSong.id) return
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0

    const lyric = await getLyric(newSong)
    store.commit('addLyric', { song: newSong, lyric })
    if (currentSong.value.lyric !== lyric) return
    currentLyric.value = new Lyric(lyric, handleLyric)
    console.log('currentLyric.value ------> ', currentLyric.value)
    // 开始播放歌词，但是有两个异步过程:1. 获取 lyric 2. audio 标签的 canplay
    // canplay ready 了
    if (songReady.value) {
      playLyric()
    }
  })

  function handleLyric ({ lineNum }) {
    currentLineNum.value = lineNum
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    stopLyric,
    lyricScrollRef,
    lyricListRef
  }
}
