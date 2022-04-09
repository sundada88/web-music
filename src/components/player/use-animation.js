import { ref } from 'vue'
import { addKeyFrameToHead } from '../../assets/js/dom'

export default function useAnimation () {
  const cdWrapperRef = ref(null)

  function enter (el, done) {
    const { x, y, scale } = getPosAndScale()
    const cdWrapperRefVal = cdWrapperRef.value
    cdWrapperRefVal.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    const str = `
    0% {
      transform: translate3d(${x}px, ${y}px, 0) scale(${scale});
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    `
    addKeyFrameToHead('move', str)
    cdWrapperRefVal.style.animation = 'move 2s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperRefVal.addEventListener('animationend', next)
    function next () {
      cdWrapperRefVal.removeEventListener('animationend', next)
      done()
    }
  }
  function afterEnter () {
    const cdWrapperRefVal = cdWrapperRef.value
    cdWrapperRefVal.style.transition = ''
    cdWrapperRefVal.style.transform = ''
  }
  function leave (el, done) {
    const { x, y, scale } = getPosAndScale()
    const cdWrapperRefVal = cdWrapperRef.value
    cdWrapperRefVal.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperRefVal.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperRef.value.addEventListener('transitionend', next)
    function next () {
      cdWrapperRef.value.removeEventListener('transitionend', next)
      done()
    }
  }
  function afterLeave () {
    const cdWrapperRefVal = cdWrapperRef.value
    cdWrapperRefVal.style.transition = ''
    cdWrapperRefVal.style.transform = ''
  }

  function getPosAndScale () {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width
    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
