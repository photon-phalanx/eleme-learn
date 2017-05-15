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
      router.app.$nextTick(() => {
        router.app.$store.push({name: 'my'})
      })
      return next(false)
    }
  }
  if (to.matched.some(record => {
      return record.meta.requireAuth
    })) {
    if (!hasLogin) {
      router.app.$store.commit('commitMsg', '请先登录')
      router.app.$nextTick(() => {
        router.app.$router.push({name: 'login'})
      })
      // 之所以这样写而不直接用 next({name: 'login'})是因为这样他还是会保留一条记录在history里，这样go -1是不够的
      // 为了兼容性，这里取消导航,然后手动导航吧
      return next(false)
    }
  }
  next()
})

router.afterEach((to, from) => {
})
export default router
