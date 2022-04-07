<template>
  <scroll class="index-list" ref="scrollRef" @scroll="onScroll" :probe-type="3">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" class="item" @click="onItemClick(item)">
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 悬浮显示 -->
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <!-- 右边的快速导航 -->
    <div
      class="shortcut"
      @touchstart.prevent.stop.passive="onShortcutTouchStart"
      @touchmove.prevent.stop.passive="onShortcutTouchMove"
      @touchend.prevent.stop
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{ 'current': currentIndex === index }"
        >{{ item }}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import scroll from '@/components/base/scroll/scroll.vue'
import useFixed from './use-fixed'
import useShortcut from './use-shortcut'
import { ref } from 'vue'

export default {
  name: 'index-list',
  emits: ['select'],
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    scroll
  },
  setup (props, { emit }) {
    const scrollRef = ref(null)
    const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props)
    const { shortcutList, onShortcutTouchStart, onShortcutTouchMove } = useShortcut(props, groupRef, scrollRef)
    const onItemClick = item => {
      emit('select', item)
    }

    return {
      scrollRef,
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
      onItemClick
    }
  }
}
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
