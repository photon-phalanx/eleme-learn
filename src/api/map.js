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
  return new Promise(function (resolve, reject) {
    var convertor = new BMap.Convertor()
    convertor.translate(pointArr, 1, 5, function (data) {
      if (data.status === 0) resolve(data.points) // 这是一个数组
      else reject(data)
    })
  })
}

// 定位得到目前经纬度
function getPosition (self) {
  let geolocation = new BMap.Geolocation()
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() === 0) {
      let point = new BMap.Point(r.point.lng, r.point.lat)
      convertor([point]).then((data) => {
        // 这里拿到的是数组，但是这里只转换一项
        data = data[0]
        r.point.lng = data.lng
        r.point.lat = data.lat
        self.$store.commit('changePos', r)
      }).catch(() => {
        self.$store.commit('commitMsg', '坐标转换失败')
        self.$store.commit('changePos', 'fail')
      })
    } else {
      self.$store.commit('commitMsg', '获取地理位置失败')
      self.$store.commit('changePos', 'fail')
    }
  })
}

// 逆地址解析，根据坐标得到所在位置
function geocoder (point) {
  return new Promise(function (resolve, reject) {
    var geoc = new BMap.Geocoder()
    geoc.getLocation(point, function (rs) {
      resolve(rs)
    })
  })
}

export {getPosition, geocoder, convertor}
