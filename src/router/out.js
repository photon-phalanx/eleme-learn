import router from './index'
import store from '../vuex/state'

router.beforeEach((to, from, next) => {
  let uid = store.state.uid
  let hasLogin = uid !== undefined
  if (to.matched.some(record => {
      return record.meta.noRequireAuth
    })) {
    if (hasLogin) {
      router.app.$store.commit('commitMsg', '已登录')
      return next({name: 'my'})
    }
  }
  if (to.matched.some(record => {
      return record.meta.requireAuth
    })) {
    if (!hasLogin) {
      router.app.$store.commit('commitMsg', '请先登录')
      return next({name: 'login'})
    }
  }
  next()
})

router.afterEach((to, from) => {
})
export default router
