// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/out'
import Vuex from 'vuex'
import state from './vuex/state'
import {get, post} from './api/http'
/* 我希望引入vuex，这样可以在api里去提交错误信息，然后再app里的错误组件可以拿到它并作相应反应
   虽然脱离了饿了吗的样式，但这可以作为vuex的学习
*/
/* 将axios挂在vue的原型上，稍微好看一点 */
Vue.use(Vuex)
const store = new Vuex.Store(state)
Vue.prototype.$get = get
Vue.prototype.$post = post

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
