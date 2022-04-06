import { ref } from 'vue'

export default function useInterActive () {
  const currentShow = ref('cd')
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)
  let currentView = 'cd'

  const touch = {}

  function onMiddleTouchStart (e) {
    touch.startX = e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    touch.directionLock = ''
  }
  function onMiddleTouchMove (e) {
    const deltaX = e.touches[0].pageX - touch.startX
    const deltaY = e.touches[0].pageY - touch.startY

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // console.log('absDeltaX', absDeltaX)
    // console.log('absDeltaY', absDeltaY)
    if (!touch.directionLock) {
      touch.directionLock = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    console.log('touch.directionLock ---> ', touch.directionLock)
    if (touch.directionLock === 'v') return

    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(left + deltaX, -window.innerWidth))
    touch.present = Math.abs(offsetWidth / window.innerWidth)
    if (currentView === 'cd') {
      if (touch.present > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.present > 0.8) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    }
    middleLStyle.value = {
      opacity: 1 - touch.present,
      transitionDuration: '0ms'
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: '0ms'
    }
  }
  function onMiddleTouchEnd (e) {
    /* eslint-disable */
    let offsetWidth = 0
    let opacity = 0
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }
    const duration = 300
    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }
    middleRStyle.value = {
      opacity: 1 - opacity,
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    }
  }
  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}
