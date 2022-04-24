<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length && !query">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearch"></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import storage from 'good-storage'

import Suggest from '@/components/base/search/suggest'
import SearchInput from '@/components/base/search/search-input.vue'
import SearchList from '@/components/base/search-list/search-list.vue'
import useSearchHistory from '@/components/base/search/use-search-history'
import Scroll from '@/components/wrap-scroll'

import { getHotKeys } from '@/service/search'
import { SINGER_KEY } from '@/assets/js/constant.js'

export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest,
    SearchList,
    Scroll
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const query = ref('')
    const hotKeys = ref([])
    const selectedSinger = ref(null)
    const scrollRef = ref(null)

    const searchHistory = computed(() => store.state.searchHistory)

    const { saveSearch, deleteSearch } = useSearchHistory()

    function addQuery (key) {
      query.value = key
    }

    getHotKeys().then(res => {
      hotKeys.value = res.hotKeys
    })

    watch(query, async (newQuery) => {
      if (!newQuery) {
        await nextTick()
        refreshScroll()
      }
    })

    function refreshScroll () {
      scrollRef.value.scroll.refresh()
    }

    function selectSong (song) {
      store.dispatch('addSong', song)
      saveSearch(query.value)
    }
    function cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }

    function selectSinger (singer) {
      console.log('query.value ---> ', query.value)
      selectedSinger.value = singer
      cacheSinger(singer)
      saveSearch(query.value)
      router.push({
        path: `/singer/${singer.mid}`
      })
    }

    return {
      scrollRef,
      query,
      addQuery,
      hotKeys,
      selectSong,
      selectSinger,
      selectedSinger,
      searchHistory,
      deleteSearch
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

  .search-content {
    flex: 1;
    overflow: hidden;

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

  }

  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
