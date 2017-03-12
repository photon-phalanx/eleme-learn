<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{active : currentIndex === index}"
            @click="clickScroll(index, $event)">
          <span class="text border-1px">
          <Icon v-if="item.type > -1" :typeNum="item.type" :sizeNum="3"></Icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <div class="title">{{item.name}}</div>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <i class="icon">
                <img :src="food.icon"/>
              </i>
              <div class="content">
                <div class="name"> {{food.name}}</div>
                <div class="description">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span><span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <!--设置index1,2是为了快速的更新,我觉得还是有些必要的233
                  其实父子的通信还是清晰的……所以不用vuex了，只会加大复杂度
                  -->
                  <CartControl :food="food" @increase="increase(food)" @decrease="decrease(food)"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
              :select-foods="selectFoods"></ShopCart>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";

  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px; //android兼容
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        width: 56px;
        //margin: 0 auto;
        padding: 0 12px;
        height: 54px;
        line-height: 14px;
        &.active {
          position: relative;
          top: -1px;
          z-index: 5;
          background-color: #ffffff;
          font-weight: 700;
          .text {
            @include border-none();
          }
        }
        .text {
          display: table-cell;
          width: 100%;
          vertical-align: middle;
          font-size: 12px;
          text-align: center;
          @include border-1px(rgba(7, 17, 27, 0.1));
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        margin-bottom: 0;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none();
        }
        .icon {
          flex: 0 0 57px;
          height: 57px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .description, .extra, .price {
            margin: 8px 0;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .description {
            line-height: 12px;
          }
          .extra {
            .count {
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
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Icon from '../icon/Icon.vue'
  import ShopCart from '../shopCart/ShopCart.vue'
  import CartControl from '../cartControl/CartControl.vue'
  export default{
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        seller: ''
      }
    },
    async mounted () {
      this.goods = await this.$get('goods')
      this.seller = await this.$get('seller') // 其实用vuex会比较好，以及至少，这个完全不需要2个await 可以用promise.all一起进行，也算是小优化
      this.$nextTick(() => {  // vue更新组件是异步的，在下一个循环的时候再加
        this._initScroll()
        this._calHeight()
      })
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      clickScroll (index, event) {
        if (!event._constructed) { // 这个滚动效果插件会派发一个click事件，这个自定义事件有_constructed属性，通过这个判别是不是原生事件
          // 移动端没有问题，但是pc端会有一次原生一次派发的2次时间，对于原生事件，不执行，返回
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      increase (food) {
        food.count ? food.count++ : this.$set(food, 'count', 1)
      },
      decrease (food) {
        food.count--
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i]
          let nextHeight = this.listHeight[i + 1] ? this.listHeight[i + 1] : Infinity
          if (this.scrollY >= height && this.scrollY < nextHeight) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components: {
      Icon,
      ShopCart,
      CartControl
    }
  }
</script>
