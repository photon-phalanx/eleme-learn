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
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <rating-select @select="select" @toggleContent="toggleContent" :selectType="selectType" :desc="desc"
                         :onlyContent="onlyContent"
                         :ratings="food.ratings"></rating-select>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar"/>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="text">
                  <i :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></i>
                  <span>{{rating.text}}</span>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-else>暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScoll from 'better-scroll'
  import CartControl from '../../components/cartControl/CartControl.vue'
  import Split from '../../components/split/Split.vue'
  import RatingSelect from '../../components/ratingSelect/RatingSelect.vue'
  import {formatDate} from '../../api/date'
  // const POSITIVE = 0, NEGATIVE = 1, ALL = 2
  const ALL = 2
  export default {
    data () {
      return {
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
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
    filters: {
      formatDate (rateTime) {
        return formatDate(new Date(rateTime), 'YYYY-MM-DD hh:mm')
      }
    },
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
      },
      select (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        } else if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    components: {
      CartControl,
      Split,
      RatingSelect
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin";

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
        &.fade-leave, &.fade-enter-to {
          opacity: 1;
        }
        &.fade-leave-to, &.fade-enter {
          opacity: 0;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        font-size: 14px;
        margin-left: 18px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
          }
        }
        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
</style>
