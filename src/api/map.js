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

/*
* 因为不用https，手机端会被拦，所以只能用百度地图api了……
* 但是用了百度地图的api后pc端炸了……o(︶︿︶)o 唉
* */
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
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 10000
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

// 这个searchNearby最初是为了搜索附近地址，但是发现可以逆定位，他的用处就没有这么大了？可以用来搜索
function searchNearby (keyword, center, radius = 1000, pageCapacity = pageCapacity) {
  return new Promise(function (resolve, reject) {
    let local = new BMap.LocalSearch(center, {
      onSearchComplete: function (rs) {
        if (rs.ur) resolve(rs)
        else {
          let arr = []
          let rsLen = rs.length
          for (let i = 0; i < rsLen; i++) {
            // 每一个rs
            let ur = rs[i].ur
            let urLen = ur.length
            for (let j = 0; j < urLen; j++) {
              // 每一个ur，在保证ur不重复的情况下添加到数组里
              let flag = true
              for (let k = 0; k < arr.length; k++) {
                if (ur[j].uid === arr[k].uid) {
                  flag = false
                  break
                }
              }
              if (flag) arr.push(ur[j])
            }
          }
          resolve(arr)
        }
      },
      pageCapacity: pageCapacity
    })
    local.searchNearby(keyword, center, radius)
  })
}

function search (keyword, center) {
  return new Promise(function (resolve, reject) {
    let local = new BMap.LocalSearch(center, {
      onSearchComplete: function (rs) {
        resolve(rs)
      }
    })
    local.search(keyword)
  })
}

// 为了统一一致，需要用地址逆解析
function getSelectedDetail (point) {
  return geocoder(point)
}

function getCurrentPosition () {
  let self = this
  self.nearbyArr = []
  self.$store.commit('changePos', 'pending')
  getPosition()
  // .then(convertor)
    .then(geocoder)
    .then(function (rs) {
      self.$store.commit('changePos', rs)
    }).catch(function (err) {
    let msg = ''
    if (err.message) msg = '\n原因:' + err.message
    self.$store.commit('changePos', 'fail')
    self.$store.commit('commitMsg', '定位失败,请手动选择位置' + msg)
  })
}
export {getPosition, geocoder, convertor, searchNearby, search, getCurrentPosition, getSelectedDetail}
