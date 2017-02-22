/**
 * Created by Photon_palanx on 2017/2/21.
 */

import axios from 'axios'

let host = 'http://127.0.0.1:8080/'

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

export {get, post}
