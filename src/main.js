// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {get, post} from './api/http.js'

/* 将axios挂在vue的原型上，稍微好看一点 */
Vue.prototype.$http = {
  get,
  post
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
