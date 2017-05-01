/**
 * Created by Administrator on 2017/4/29.
 */
import BMap from 'BMap'

/*
function getCity (self) {
  let city = new BMap.LocalCity()
  city.get((result) => {
    console.log(result)
    self.$store.commit('changeCity', result)
  })
}
*/

// 坐标转换
function convertor (pointArr) {
  if (!(pointArr instanceof Array)) pointArr = [pointArr]
  return new Promise(function (resolve, reject) {
    var convertor = new BMap.Convertor()
    convertor.translate(pointArr, 1, 5, function (data) {
      if (data.status === 0) resolve(data.points) // 这是一个数组
      else reject(data)
    })
  })
}

/*
// 定位得到目前经纬度,用原生的html5吧……
function getPosition () {
  return new Promise(function (resolve, reject) {
    window.navigator.geolocation.getCurrentPosition(function (position) {
      let coords = position.coords
      let point = {lat: coords.latitude, lng: coords.longitude}
      resolve(point)
    }, function (err) {
      reject(err)
    })
  })
}
*/

function getPosition () {
  return new Promise(function (resolve, reject) {
    let geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() === 0) {
        console.log(r.point)
        resolve(r.point)
      } else {
        console.log('err')
        reject(r)
      }
    })
  })
}

// 逆地址解析，根据坐标得到所在位置
function geocoder (point) {
  // 有length 说明是数组
  if (point.length) point = point[0]
  return new Promise(function (resolve, reject) {
    var geoc = new BMap.Geocoder()
    geoc.getLocation(point, function (rs) {
      resolve(rs)
    })
  })
}

export {getPosition, geocoder, convertor}
