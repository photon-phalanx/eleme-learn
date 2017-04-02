export function isEmpty (obj) {
  for (var i in obj) {
    return false
  }
  return true
}

// 将查询字符串转成object,也可以手动传入url
export function parseUrl (str) {
  let url = str || window.location.search
  let obj = {}
  let arr, pattern
  let reg = /[?&]([^?&]+=[^?&]+)/g
  while ((arr = reg.exec(url)) !== null) {
    pattern = arr[1]
    arr = pattern.split('=')
    obj[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1])
  }
  return obj
}
