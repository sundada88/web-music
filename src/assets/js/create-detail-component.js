import MusicList from '@/components/music-list/music-list'
import { processSongs } from '@/service/song'
import storage from 'good-storage'

export default function createDetailComponent (name, key, fetch) {
  return {
    name,
    props: {
      data: Object
    },
    components: {
      MusicList
    },
    data () {
      return {
        songs: [],
        loading: true
      }
    },
    computed: {
      computedData () {
        let res = null
        const data = this.data
        if (data) {
          res = data
        } else {
          const cache = storage.session.get(key)
          if (cache && (cache.mid || cache.id + '') === this.$route.params.id) {
            res = cache
          }
        }
        return res
      },
      pic () {
        const data = this.computedData
        return data && data.pic
      },
      title () {
        const data = this.computedData
        return data && (data.name || data.title)
      }
    },
    async created () {
      const computedData = this.computedData
      if (!computedData) {
        const path = this.$route.matched[0].path
        this.$router.push({ path })
        return
      }
      const result = await fetch(computedData)
      this.songs = await processSongs(result.songs)
      this.loading = false
    }
  }
}
