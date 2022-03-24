<template>
  <div class="singer">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import getUserList from '@/service/singer.js'
import IndexList from '@/components/base/index-list/index-list.vue'

export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: []
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
