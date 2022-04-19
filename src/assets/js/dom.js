export function addClass (el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

export function removeClass (el, className) {
  el.classList.remove(className)
}

export function addKeyFrameToHead (name, str) {
  const runKeyframes = `@keyframes ${name} {${str}}`
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = runKeyframes
  document.getElementsByTagName('head')[0].appendChild(style)
}
