import storage from 'good-storage'

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index > -1) return
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// item 就是需要存进来的数据, key 是 storage 中的 key 值， compare 是比较函数，为 true 存进去
export function save (item, key, compare, maxLen) {
  const items = storage.get(key, [])
  // 如果 item 在 items 中的话，
  insertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

export function remove (key, compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load (key) {
  return storage.get(key)
}
