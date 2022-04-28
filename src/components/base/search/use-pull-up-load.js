import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDom from '@better-scroll/observe-dom'
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

BScroll.use(PullUp).use(ObserveDom)

export default function usePullUpLoad (requestData, preventPullUp) {
  const scroll = ref(null)
  const rootRef = ref(null)
  const isPullUpLoad = ref(false)
  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true
    }))
    scrollVal.on('pullingUp', pullingHandler)
    async function pullingHandler () {
      if (preventPullUp.value) {
        scrollVal.finishPullUp()
        return
      }
      isPullUpLoad.value = true
      await requestData()

      scrollVal.finishPullUp()
      scrollVal.refresh()

      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })
  onDeactivated(() => {
    scroll.value.disable()
  })
  return {
    scroll,
    isPullUpLoad,
    rootRef
  }
}
