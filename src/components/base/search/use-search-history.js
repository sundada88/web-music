import { useStore } from 'vuex'
import { save } from '../../../assets/js/arr-store'
import { SEARCH_KEY } from '../../../assets/js/constant'

export default function useSearchHistory () {
  const maxLen = 200
  const store = useStore()
  function saveSearch (query) {
    const searches = save(query, SEARCH_KEY, item => item === query, maxLen)
    console.log('searches ---> ', searches)
    store.commit('setSearchHistory', searches)
  }
  return {
    saveSearch
  }
}
