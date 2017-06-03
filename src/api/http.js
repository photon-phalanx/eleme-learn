import axios from 'axios'
import queryString from 'querystring'
// const host = 'http://127.0.0.1:8080/'
const host = 'http://118.89.150.117:8080/elemeBackend/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true
/*
 async function get (url, params) {
 let res
 try {
 res = await axios.get(host + url, {params})
 if (res.data.r) {
 this.$store.commit('commitMsg', res.data.r)
 } else {
 return res.data.data
 }
 } catch (e) {
 this.$store.commit('commitMsg', '请求数据失败')
 }
 return ''
 }

 async function post (url, params) {
 let res
 try {
 res = await axios.post(host + url, params)
 if (res.data.r) {
 this.$store.commit('commitMsg', res.data.r)
 } else {
 return res.data.data
 }
 } catch (e) {
 this.$store.commit('commitMsg', '请求数据失败')
 }
 return ''
 }
 */
async function get (url, params) {
  let address = ~url.indexOf('http') ? url : host + url
  let res
  try {
    let sub = ''
    if (params) sub = '?' + queryString.stringify(params)
    res = await axios.get(address + sub)
    if (res.data.r) {
      this.$store.commit('commitMsg', res.data.r)
    } else {
      return res.data
    }
  } catch (e) {
    this.$store.commit('commitMsg', '请求数据失败')
  }
  return null
}

async function post (url, params) {
  let address = ~url.indexOf('http') ? url : host + url
  let res
  try {
    res = await axios.post(address, queryString.stringify(params))
    console.log(res)
    if (res.data.r) {
      this.$store.commit('commitMsg', res.data.r)
    } else {
      return res.data
    }
  } catch (e) {
    this.$store.commit('commitMsg', '请求数据失败')
  }
  return null
}

export {get, post, host}
