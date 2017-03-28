<template>
  <transition name="move">
    <div class="food" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image"/>
          <div class="back-wrapper" @click="hide()">
            <i class="icon-self icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now-price">￥{{food.price}}</span><span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cart-control-wrapper">
            <CartControl :food="food" @increase="increase()" @decrease="decrease()"></CartControl>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count ===0" @click="increase($event)">
              加入购物车
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScoll from 'better-scroll'
  import CartControl from '../../components/cartControl/CartControl.vue'
  export default {
    data () {
      return {}
    },
    mounted () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScoll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    props: ['food'],
    methods: {
      hide () {
        this.$emit('hide')
      },
      increase (event) {
        if (!event) {
          this.$emit('increase')
        } else if (!event._constructed) {
          return
        } else {
          this.$emit('increase')
        }
      },
      decrease () {
        this.$emit('decrease')
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 4;
    width: 100%;
    background-color: #ffffff;
    transition: all 0.2s linear;
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    &.move-enter-to, &.move-leave {
      transform: translate3d(0, 0, 0);
    }
    .img-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%; // w3c标准描述，padding设为100%的时候相对于width计算
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back-wrapper {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        font-size: 14px;
        margin-bottom: 8px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        height: 10px;
        .sell-count, .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        line-height: 24px;
        .now-price {
          margin-right: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .old-price {
          text-decoration: line-through;
          font-size: 10px;
          font-weight: 700;
          color: rgb(147, 153, 159);
        }
      }
      .cart-control-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 12px;
        color: #fff;
        background-color: rgb(0, 160, 220);
        transition: all .2s linear;
        &.fade-leave,&.fade-enter-to {
          opacity: 1;
        }
        &.fade-leave-to,&.fade-enter {
          opacity: 0;
        }
      }
    }
  }
</style>
