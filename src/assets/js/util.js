export function shuffle (source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt (max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap (arr, i, j) {
  // ;[arr[i], arr[j]] = [arr[j], arr[i]]
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
