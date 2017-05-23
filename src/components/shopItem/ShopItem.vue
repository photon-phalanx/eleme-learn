<template>
  <div class="shop-item-wrapper border-1px" ref="shopItemWrapper">
    <!--
    因为css不能给auto的height变化做动画，所以只能用js来拿到宽度后塞进去了，所以用一个wrapper
    基本想法是内部算完高度后给外部，外部overflow hidden先隐去内部，有了高度在展开去模拟这个auto的过渡效果
    -->
    <div class="shop-item" ref="shopItem">
      <div class="avatar-wrapper">
        <img :src="item.avatar" class="avatar"/>
      </div>
      <div class="content">
        <div class="show-content border-1px">
          <div class="title">{{item.name}}</div>
          <div class="star-line">
            <star :size="36" :len="5" :score="item.score" class="star"></star>
            <span class="info">月售{{item.sellCount}}单</span>
          </div>
          <div class="info-line">
            <div class="left">
              <span class="minPrice">￥{{item.minPrice}}起送</span>
              <span class="splice">|</span>
              <span class="delivery-price">配送费￥{{item.deliveryPrice}}</span>
              <span class="splice">|</span>
              <span class="ava-price">￥28/人</span>
            </div>
            <div class="right">
              <span class="distance">{{item.distance}}m</span>
              <span class="splice">|</span>
              <span class="delivery-time">{{item.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="activity" v-if="item.supports.length > 0" @click.stop="changeShowFlag()">
          <div class="count" v-show="item.supports.length > 2">
            {{item.supports.length}}个活动
            <transition name="fade" mode="out-in">
              <i class="iconfont icon-xia" v-if="showFlag === false" key="xia"></i>
              <i class="iconfont icon-shang" v-if="showFlag === true" key="shang"></i>
            </transition>
          </div>
          <transition-group name="list" tag="div">
            <div v-for="(activity,index) in showList" :key="activity" class="line">
              <icon :sizeNum="3" :typeNum="activity.type"></icon>
              <span class="description">{{activity.description}}</span>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../star/Star.vue'
  import Icon from '../icon/Icon.vue'
  let originHeight = 0
  let openHeight = 0
  export default {
    data () {
      return {
        showFlag: false
      }
    },
    mounted () {
      let shopItem = this.$refs.shopItem
      let shopItemWrapper = this.$refs.shopItemWrapper
      originHeight = shopItem.offsetHeight
      shopItemWrapper.style.height = originHeight + 'px'
    },
    props: ['item'],
    methods: {
      changeShowFlag () {
        this.showFlag = !this.showFlag
        this.$emit('callReCalc')
        this.$nextTick(() => {
          let height
          let shopItem = this.$refs.shopItem
          let shopItemWrapper = this.$refs.shopItemWrapper
          if (!openHeight && this.showFlag === true) openHeight = shopItem.offsetHeight
          height = this.showFlag ? openHeight : originHeight
          shopItemWrapper.style.height = height + 'px'
        })
      }
    },
    computed: {
      showList () {
        if (this.item.supports.length <= 2) return this.item.supports
        if (this.showFlag) return this.item.supports
        else {
          let arr = []
          arr.push(this.item.supports[0])
          arr.push(this.item.supports[1])
          return arr
        }
      }
    },
    components: {
      Star,
      Icon
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .shop-item-wrapper {
    transition: height 0.2s linear;
    height: auto;
    @include border-1px($border);
    margin: 10px;
    .shop-item {
      display: flex;
      .avatar-wrapper {
        flex: 0 0 50px;
        width: 50px;
        .avatar {
          width: 50px;
          height: 50px;
        }
      }
      .content {
        flex: 1;
        margin-left: 5px;
        .show-content {
          margin-bottom: 10px;
          .title {
            font-size: 17px;
            line-height: 17px;
            font-weight: 600;
          }
          .star-line {
            .star, .info {
              display: inline-block;
              vertical-align: middle;
            }
            .info {
              margin: 5px 0;
              line-height: 15px;
              height: 15px;
              font-size: 12px;
              color: $deep-grey;
            }
          }
          .info-line {
            display: flex;
            padding: 5px 0;
            line-height: 16px;
            font-size: 12px;
            color: $deep-grey;
            .left {
              flex: 1;
            }
            .right {
              flex: 0 0 78px;
              .delivery-time {
                color: #0088aa;
              }
            }
          }
          @include border-1px($border);
        }
        .activity {
          position: relative;
          .count {
            position: absolute;
            right: 0;
            top: 0;
            color: $deep-grey;
            font-size: 12px;
            line-height: 1;
            .iconfont {
              line-height: 1;
              font-size: 12px;
              transition: opacity .1s linear;
              &.fade-enter-to, &.fade-leave {
                opacity: 1;
              }
              &.fade-enter, &.fade-leave-to {
                opacity: 0;
              }
            }
          }
          .line {
            padding: 1px 0;
            transition: all 0.2s linear;
            opacity: 1;
            &.list-enter-to, &.list-leave {
              opacity: 1;
            }
            &.list-enter, &.list-leave-to {
              opacity: 0;
            }
            .description {
              font-size: 12px;
              line-height: 1;
              color: $deep-grey;
              vertical-align: top;
            }
          }
        }
      }
    }

  }
</style>
