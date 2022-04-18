<template>
  <div class="singer">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="singer"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import getUserList from '@/service/singer.js'
import IndexList from '@/components/base/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'

export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      singer: null
    }
  },
  methods: {
    selectSinger (singer) {
      this.singer = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  },
  async created () {
    const result = await getUserList()
    this.singers = result.singers
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
}
</style>
