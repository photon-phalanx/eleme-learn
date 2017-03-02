<template>
  <div class="shop-cart">
    <div class="content">
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
      <div class="right">
        <div class="pay" :class="{enough: payDescription==='去结算'}">
          {{payDescription}}
        </div>
      </div>
    </div>
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
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    },
    props: ['deliveryPrice', 'minPrice', 'selectFoods'],
    components: {},
    computed: {
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
      payDescription () { // 状态似乎有点多，2个就用v-if吧 还是喜欢v-if
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送'
        } else if (this.totalPrice < this.minPrice) {
          return '还差' + (this.minPrice - this.totalPrice) + '元起送'
        } else {
          return '去结算'
        }
      }
    }
  }
</script>
