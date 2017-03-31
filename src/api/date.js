function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function formatDate (date, str) {
  // YYYY-MM-DD hh mm ss
  str = str.replace(/(Y+)/, function (whole, sub1) {
    return date.getFullYear().toString().substr(4 - sub1.length)
  })
  //  .replace(/(M+)/,RegExp.$1.length===1?(date.getMonth()+1).toString():padLeftZero(date.getMonth()+1))
  let o = {
    '(M+)': date.getMonth() + 1,
    '(D+)': date.getDate(),
    '(h+)': date.getHours(),
    '(m+)': date.getMinutes(),
    '(s+)': date.getSeconds()
  }
  for (let i in o) {
    let tmpStr = o[i].toString()
    str = str.replace(new RegExp(i), function (whole, sub1) {
      return sub1.length === 1 ? tmpStr : padLeftZero(tmpStr)
    })
  }
  return str
}

export {formatDate}

