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
import Login from '../views/home/children/login/Login.vue'
import PwLogin from '../views/home/children/pwLogin/PwLogin.vue'
import Breakfast from '../views/home/children/orderList/children/breakfast/Breakfast.vue'
import TakeAway from '../views/home/children/orderList/children/takeAway/TakeAway.vue'
import Detail from '../views/home/children/detail/Detail.vue'
import Config from '../views/home/children/config/Config.vue'

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
          path: '/config',
          name: 'config',
          component: Config
        },
        {
          path: '/detail',
          name: 'detail',
          component: Detail,
          meta: {
            requireAuth: true
          }
        },
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
          component: OrderList,
          children: [
            {
              path: 'take-away',
              name: 'take-away',
              component: TakeAway
            },
            {
              path: 'breakfast',
              name: 'breakfast',
              component: Breakfast
            },
            {
              path: '',
              redirect: 'take-away'
            }
          ]
        },
        {
          path: 'find',
          name: 'find',
          component: Find
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: {
            noRequireAuth: true
          }
        },
        {
          path: '/pwLogin',
          name: 'pwLogin',
          component: PwLogin,
          meta: {
            noRequireAuth: true
          }
        },
        {
          path: '',
          redirect: 'my'
        }
      ]
    },
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '*',
      redirect: 'home'
    }
  ]
})
