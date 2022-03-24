import { nextTick, ref, watch } from 'vue'

export default function useFixed (props) {
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)

  watch(
    () => props.data,
    async () => {
      await nextTick()
      calculate()
    }
  )
  function calculate () {
    const list = groupRef.value.children
    let height = 0
    const listHeightsVal = listHeights.value

    listHeightsVal.length = 0
    listHeights.value.push(0)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }
  function onScroll (pos) {
    console.log('pos ---------------->', pos)
    scrollY.value = -pos.y
    console.log('scrollY.value =====> ', scrollY.value)
  }

  return {
    groupRef,
    onScroll
  }
}
