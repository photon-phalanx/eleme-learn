import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../views/Shop/children/goods/Goods.vue'
import Comment from '../views/Shop/children/comment/Comment.vue'
import Sellers from '../views/Shop/children/sellers/Sellers.vue'
import Home from '../views/home/Home.vue'
import My from '../views/home/children/my/My.vue'
import Order from '../views/home/children/order/Order.vue'
import OrderList from '../views/home/children/orderList/OrderList.vue'
import Find from '../views/home/children/find/Find.vue'
import Shop from '../views/Shop/Shop.vue'
import Login from '../views/login/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        },
        {
          path: 'comment',
          name: 'comment',
          component: Comment
        },
        {
          path: 'sellers',
          name: 'sellers',
          component: Sellers
        },
        {
          path: '',
          redirect: 'goods'
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'my',
          name: 'my',
          component: My
        },
        {
          path: 'order',
          name: 'order',
          component: Order
        },
        {
          path: 'order-list',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'find',
          name: 'find',
          component: Find
        },
        {
          path: '',
          redirect: 'my'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: 'home'
    }
  ]
})
