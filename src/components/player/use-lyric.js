import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '../../service/song'

export default function usrLyric () {
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  watch(currentSong, async newSong => {
    if (!newSong.url || !newSong.id) return
    const lyric = await getLyric(newSong)
    store.commit('addLyric', { song: newSong, lyric })
  })
}
