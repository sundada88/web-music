<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <div class="hot-keys" v-show="!query">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
          <span>{{ item.key }}</span>
        </li>
      </ul>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong"></suggest>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Suggest from '@/components/base/search/suggest'
import SearchInput from '../components/base/search/search-input.vue'
import { getHotKeys } from '@/service/search'
import { useStore } from 'vuex'
export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest
  },
  setup () {
    const store = useStore()
    const query = ref('')
    const hotKeys = ref([])

    function addQuery (key) {
      query.value = key
    }

    getHotKeys().then(res => {
      hotKeys.value = res.hotKeys
    })

    function selectSong (song) {
      store.dispatch('addSong', song)
    }

    return {
      query,
      addQuery,
      hotKeys,
      selectSong
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .search-input-wrapper {
    margin: 20px;
  }

  // .search-content {
  //   flex: 1;
  //   overflow: hidden;

  .hot-keys {
    margin: 0 20px 20px 20px;

    .title {
      margin-bottom: 20px;
      font-size: $font-size-medium;
      color: $color-text-l;
    }

    .item {
      display: inline-block;
      padding: 5px 10px;
      margin: 0 20px 10px 0;
      border-radius: 6px;
      background: $color-highlight-background;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }

  .search-history {
    position: relative;
    margin: 0 20px;

    .title {
      display: flex;
      align-items: center;
      height: 40px;
      font-size: $font-size-medium;
      color: $color-text-l;

      .text {
        flex: 1;
      }

      .clear {
        @include extend-click();

        .icon-clear {
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }

  }

  // }

  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
