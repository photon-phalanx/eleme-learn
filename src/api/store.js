// 接受2种参数，id，{}或者id，key，value。对于前者，会把对象里的每一条存进去
function commonSaveToLocal (id, key, value) {
  let store = window.localStorage['__' + id + '__']
  if (!store) store = {}
  else store = JSON.parse(store)
  if (value === undefined && typeof key === 'object') {
    for (let i in key) {
      store[i] = key[i]
    }
  } else {
    store[key] = value
  }
  window.localStorage['__' + id + '__'] = JSON.stringify(store)
}

// 这个是用来向localStorage数组追加的
function commonAddToLocal (id, value, limit) {
  let store = window.localStorage['__' + id + '__']
  if (!store) store = []
  else store = JSON.parse(store)
  // 不重复添加,应该说是去掉旧的拿到新的
  for (let index in store) {
    if (store.hasOwnProperty(index) && store[index].address === value.address) {
      store.splice(index, 1)
      break
    }
  }
  store.unshift(value)
  if (limit) {
    for (let i = limit; i < store.length; i++) {
      store.pop()
    }
  }
  window.localStorage['__' + id + '__'] = JSON.stringify(store)
}

function commonLoadFromLocal (id, key) {
  let store = window.localStorage['__' + id + '__']
  if (!store) return undefined
  store = JSON.parse(store)
  if (!key) return store
  else return store[key]
}

// id是商户名，key是存储的键名
function sellerSaveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}
// def是读不到的时候的默认数据
function sellerLoadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}

function cleanLocalStorage (id) {
  if (id) window.localStorage.removeItem('__' + id + '__')
  else window.localStorage.clear()
}

export {sellerSaveToLocal, commonAddToLocal, sellerLoadFromLocal, commonSaveToLocal, commonLoadFromLocal, cleanLocalStorage}
