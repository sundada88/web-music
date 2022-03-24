export function addClass (el, className) {
  if (!el.classList.contain(className)) {
    el.classList.add(className)
  }
}

export function removeClass (el, className) {
  el.classList.remove(className)
}
