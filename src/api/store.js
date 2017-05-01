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

export {sellerSaveToLocal, sellerLoadFromLocal, commonSaveToLocal, commonLoadFromLocal}
