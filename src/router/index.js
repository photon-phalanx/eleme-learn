import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'
import Star from '../components/star/Star.vue'
import Sellers from '../components/sellers/Sellers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/star',
      name: 'star',
      component: Star
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: Sellers
    },
    {
      path: '/',
      redirect: '/b'
    }
  ]
})
