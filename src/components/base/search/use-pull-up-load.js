import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDom from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(PullUp).use(ObserveDom)

export default function usePullUpLoad (requestData) {
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
  return {
    scroll,
    isPullUpLoad,
    rootRef
  }
}
