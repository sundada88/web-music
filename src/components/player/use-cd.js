import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default function useCd () {
  const store = useStore()

  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const playing = computed(() => store.state.playing)
  const addCls = computed(() => (playing.value ? 'playing' : ''))

  watch(playing, newVal => {
    if (!newVal) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })
  function syncTransform (wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : innerTransform + wrapperTransform
  }

  return {
    addCls,
    cdImageRef,
    cdRef
  }
}
