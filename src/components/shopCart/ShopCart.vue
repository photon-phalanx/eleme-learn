<template>
  <div>
    <div class="shop-cart">
      <div class="content" @click="toggleList">
        <div class="left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount > 0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="description">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="right" @click.stop="pay">
          <div class="pay" :class="{enough: payDescription==='去结算'}">
            {{payDescription}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="isListShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty()">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food border-1px" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <CartControl :food="food" @increase="increase(food)" @decrease="decrease(food)"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="isListShow"></div>
    </transition>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";

  .shop-cart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background-color: #141d27;
      color: rgba(255, 255, 255, 0.4);
      .left {
        flex: 1;
        //font-size: 0;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 44px;
          height: 44px;
          vertical-align: top;
          border-radius: 50%;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;
            &.highlight {
              background-color: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight {
                color: #ffffff;
              }
            }
          }
          .num {
            position: absolute;
            z-index: 20;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #ffffff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          &.highlight {
            color: #ffffff;
          }
        }
        .description {
          display: inline-block;
          margin: 12px 0 0 12px;
          line-height: 24px;
          font-size: 10px;
          font-weight: 700;
        }
      }
      .right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          background-color: #2b333b;
          &.enough {
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 50;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      transition: all 0.5s;
      transform: translate3d(0, -100%, 0);
      &.fold-enter, &.fold-leave-to {
        transform: translate3d(0, 0, 0);
      }
      &.fold-enter-to, &.fold-leave {
        transform: translate3d(0, -100%, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        overflow: hidden;
        padding: 0 18px;
        max-height: 217px;
        background-color: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          // box-sizing: border-box;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            color: rgb(240, 20, 20);
            font-weight: 700;
          }
          .cart-control-wrapper {
            position: absolute;
            right: 0;
            bottom: 5px;
          }
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    transition: all 0.5s;
    background-color: rgba(7, 17, 27, 0.6);
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    &.fade-enter-to, &.fade-leave {
      opacity: 1;
      background-color: rgba(7, 17, 27, 0.6);
    }
  }
</style>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import CartControl from '../cartControl/CartControl.vue'
  import BScroll from 'better-scroll'

  let total = 0
  export default{
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    props: ['deliveryPrice', 'minPrice', 'selectFoods'],
    components: {CartControl},
    computed: {
      ...mapGetters([
        'getDrop'
      ]),
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count
        })
        return total
      },
      isListShow () {
        if (!this.totalCount > 0) {
          this.fold = true
          return false
        }
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return !this.fold
      },
      payDescription () { // 状态似乎有点多，2个就用v-if吧 还是喜欢v-if
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送'
        } else if (this.totalPrice < this.minPrice) {
          return '还差' + (this.minPrice - this.totalPrice) + '元起送'
        } else {
          return '去结算'
        }
      }
    },
    methods: {
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.pos
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            // el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el, done) {
        // offsetHeight 触发浏览器重绘
        /* eslint-disable no-unused-vars */
        // let rf = el.offsetHeight 似乎没有必要？？
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterEnter (el) {
        console.log(el)
        total++
        console.log(total)
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
          // TODO 未解决的问题，这个神奇的display
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      increase (food) {
        food.count ? food.count++ : this.$set(food, 'count', 1)
      },
      decrease (food) {
        food.count--
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        this.$store.commit('commitMsg', '感谢使用')
      }
    },
    watch: {
      getDrop (rect) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (ball.show) {
            continue
          }
          ball.show = true
          ball.pos = rect
          this.dropBalls.push(ball)
          return
        }
      }
    }
  }
</script>
