/**
 * Created by Photon_palanx on 2017/2/21.
 */

import axios from 'axios'

let host = 'http://127.0.0.1:8080/'

async function get (url, params) {
  let res = await axios.get(host + url, {params})
  if (res.data.r) {
    alert(res.data.r)
  } else {
    return res.data.data
  }
}

async function post (url, params) {
  let res = await axios.post(host + url, params)
  if (res.data.r) {
    alert(res.data.r)
  } else {
    return res.data.data
  }
}

export {get, post}
