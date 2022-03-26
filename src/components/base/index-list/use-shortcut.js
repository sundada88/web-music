import { computed } from 'vue'

export default function useShortcut (props, groupRef, scrollRef) {
  const ANCHOR_HEIGHT = 18
  const shortcutList = computed(() => {
    return props.data.map(group => group.title)
  })

  const touch = {}

  function scrollTo (index) {
    if (isNaN(index)) return
    index = Math.max(0, Math.min(index, shortcutList.value.length - 1))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  function onShortcutTouchStart (e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = delta + touch.anchorIndex
    scrollTo(anchorIndex)
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
