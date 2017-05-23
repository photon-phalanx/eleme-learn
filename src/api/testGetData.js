/**
 * Created by Photon_palanx on 2017/4/18.
 */
var axios = require('axios')
var queryString = require('querystring')
var avatarProfix = 'https://fuss10.elemecdn.com/'
var detailProfix = 'https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id='
var avatarLessSize = '?imageView2/1/w/180/h/180'
var query = {
  latitude: 30.230946,
  longitude: 120.043332,
  limit: 5,
  offset: 0
}

function sendToBack (obj) {
  return axios.post('http://127.0.0.1:8080/seller', queryString.stringify(obj))
  // return Promise.resolve('Hello')
}

function getDetailFoods (sid) {
  return axios.get(detailProfix + sid)
}

function dealSingleFood (food) {
  // console.log(food)
  var length = food.foods.length
  // console.log('totle' + length)
  var foodList = []
  for (var i = 0; i < length; i++) {
    var obj = {}
    // console.log('now' + i)
    // console.log(food.foods[i])
    obj.name = food.foods[i].name
    obj.description = food.foods[i].description
    obj.sellCount = food.foods[i].month_sales
    obj.rating = []
    obj.price = food.foods[i].specfoods[0].price
    obj.oldPrice = food.foods[i].specfoods[0].oldPrice
    obj.info = ''
    if (food.foods[i].image_path) {
      obj.image = avatarProfix + food.foods[i].image_path.substring(0, 1) + '/' + food.foods[i].image_path.substring(1, 3) + '/' +
        food.foods[i].image_path.substring(3) + '.' +
        food.foods[i].image_path.substring(food.foods[i].image_path.search(/gif|jpeg|jpg|tiff|psd|raw/i)) +
        '?imageView2/1/w/750/h/750'
      obj.icon = avatarProfix + food.foods[i].image_path.substring(0, 1) + '/' + food.foods[i].image_path.substring(1, 3) + '/' +
        food.foods[i].image_path.substring(3) + '.' +
        food.foods[i].image_path.substring(food.foods[i].image_path.search(/gif|jpeg|jpg|tiff|psd|raw/i)) +
        '?imageView2/1/w/114/h/114'
    } else {
      obj.image = undefined
      obj.icon = undefined
    }
    foodList.push(obj)
  }
  food.foods = foodList
  console.log(food)
  return axios.post('http://127.0.0.1:8080/seller', queryString.stringify(food))
  // return Promise.resolve('hello')
}

function dealWholeFood (foods, i, data, count) {
  var length = foods.length
  // console.log(i, length)
  if (i === length) {
    dealMsgWhole(count + 1, data)
  } else {
    dealSingleFood(foods[i]).then(function (res) {
      dealWholeFood(foods, i + 1, data, count)
    })
  }
}

function dealMsgWhole (i, data) {
  if (i === data.length) return
  var obj = dealMsg(data[i])
  sendToBack(obj)
    .then(function (res) {
      getDetailFoods(obj.sid).then(function (result) {
        var data2 = result.data
        for (var item = 0; item < data2.length; item++) {
          data2[item].sid = obj.sid
        }
        dealWholeFood(data2, 0, data, i)
      })
    }).catch(function (err) {
    console.log(err)
  })
}

function dealMsg (selfData) {
  var obj = {}
  obj.avatar = avatarProfix + selfData.image_path.substring(0, 1) + '/' + selfData.image_path.substring(1, 3) + '/' +
    selfData.image_path.substring(3) + '.' + selfData.image_path.substring(selfData.image_path.search(/gif|jpeg|jpg|tiff|psd|raw/i)) + avatarLessSize
  obj.bulletin = selfData.description
  // obj.deliveryPrice = selfData.piecewise_agent_fee.rules[0].fee;
  // obj.minPrice = selfData.piecewise_agent_fee.rules[0].price;
  obj.deliveryPrice = selfData.float_delivery_fee
  obj.minPrice = selfData.float_minimum_order_amount
  obj.deliveryTime = selfData.order_lead_time
  obj.distance = ''
  obj.infos = []
  obj.infos.push(selfData.promotion_info)
  obj.infos.push(selfData.address)
  obj.infos.push('营业时间:' + selfData.opening_hours[0].replace('/', '-'))
  obj.name = selfData.name
  obj.ratingRate = 69.2 // ^^^^
  obj.ratingCount = selfData.rating_count
  obj.score = selfData.rating
  obj.sellCount = selfData.recent_order_num
  obj.serviceScore = obj.score
  obj.pics = []
  obj.supports = []
  obj.lat = (selfData.latitude * 1000000 + Math.floor(Math.random() * 200) - 100) / 1000000
  obj.lng = (selfData.longitude * 1000000 + Math.floor(Math.random() * 200) - 100) / 1000000
  obj.sid = selfData.id
  for (var i in selfData.activities) {
    var smallObj = {}
    if (selfData.activities[i].icon_name === '减') smallObj.type = 0
    else smallObj.type = 2
    smallObj.description = selfData.activities[i].description
    obj.supports.push(smallObj)
  }
  console.log('商家', obj)
  return obj
}

function getData (offset) {
  query.offset = offset
  axios.get('https://mainsite-restapi.ele.me/shopping/restaurants?' + queryString.stringify(query))
    .then(function (res) {
      var data = res.data
      dealMsgWhole(0, data)
    }).catch(function (err) {
    console.log(err)
  })
}

export {getData}
