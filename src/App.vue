<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="scrollStyle"></router-view>
  <player></player>
</template>

<script>
import { mapState } from 'vuex'

import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import player from '@/components/player/player'

export default {
  name: 'App',
  components: {
    MHeader: Header,
    Tab,
    player
  },
  computed: {
    ...mapState(['playList']),
    scrollStyle () {
      const bottom = this.playList.length ? '60px' : '0'
      return {
        bottom
      }
    }
  }
}
</script>

<style lang="scss">
</style>
