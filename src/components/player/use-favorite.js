import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { remove, save } from '../../assets/js/arr-store'
import { FAVORITE_KEY } from '../../assets/js/constant'

export default function useFavorite () {
  const MAX_LEN = 100
  const store = useStore()
  // favorite 列表
  const favoriteList = computed(() => store.state.favoriteList)

  // 看是否是 favorite
  function getFavoriteIcon (song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function isFavorite (song) {
    return favoriteList.value.findIndex(item => item.id === song.id) > -1
  }

  // 切换favorite
  function toggleFavorite (song) {
    let list
    if (isFavorite(song)) {
      // remove
      list = remove(FAVORITE_KEY, compare)
    } else {
      // add
      list = save(song, FAVORITE_KEY, compare, MAX_LEN)
    }
    store.commit('setFavoriteList', list)
    function compare (item) {
      return item.id === song.id
    }
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
