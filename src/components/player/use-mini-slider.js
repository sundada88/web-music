import { computed } from '@vue/reactivity'
import {
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useMiddleSlider () {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)

  const store = useStore()

  const fullScreen = computed(() => store.state.fullScreen)
  const playList = computed(() => store.state.playList)
  const currentIndex = computed(() => store.state.currentIndex)
  const sliderShow = computed(() => {
    return !fullScreen.value && !!playList.value
  })

  onMounted(() => {
    // eslint-disable-next-line
    let sliderVal
    watch(sliderShow, async newSliderShow => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: false
            }
          })
        } else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
        sliderVal.on('slidePageChanged', ({ pageX }) => {
          store.commit('setCurrentIndex', pageX)
        })
      }
    })

    watch(playList, async newVal => {
      if (sliderVal && sliderShow.value && newVal.length) {
        await nextTick()
        sliderVal.refresh()
      }
    })

    watch(currentIndex, newIndex => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })
  })

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })
  onDeactivated(() => {
    scroll.value.disable()
  })
  return {
    slider,
    sliderWrapperRef
  }
}
