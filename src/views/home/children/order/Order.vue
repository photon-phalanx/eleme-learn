<template>
  <div class="order-wrapper" ref="orderWrapper">
    <div class="container">
      <div class="header">
        <div class="title-line">
          <div class="title-wrapper">
            <i class="iconfont icon-dizhi"></i>
            <div class="title" @click="goPosition()" v-if="getPos && typeof getPos === 'object'">{{getShowAddress}}</div>
          </div>
          <div class="weather-wrapper">
            <div class="temperature">19°</div>
            <div class="weather ">多云</div>
          </div>
          <i class="iconfont icon-duoyun"></i>
        </div>
        <div class="search-line">
          <i class="iconfont icon-fangdajing"></i>
          <input class="text" type="text" placeholder="输入商家,商品名称"/>
        </div>
        <div class="history-line">
          <ul>
            <li class="item">星巴克</li>
            <li class="item">达克布蕾</li>
            <li class="item">auco</li>
            <li class="item">水饺</li>
            <li class="item">酸辣粉</li>
            <li class="item">0元早餐</li>
            <li class="item">麦当劳</li>
            <li class="item">蛋炒饭</li>
          </ul>
        </div>
      </div>
      <div class="classify-box-wrapper" ref="classifyBoxWrapper">
        <div class="classify-box">
          <div class="page-wrapper">
            <div class="line">
              <div class="item-wrapper">
                <easy-pic-item text="美食" :picNum="1"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="甜品饮品" :picNum="2"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="商超便利" :picNum="3"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="预定早餐" :picNum="4"></easy-pic-item>
              </div>
            </div>
            <div class="line">
              <div class="item-wrapper">
                <easy-pic-item text="果蔬生鲜" :picNum="5"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="新店特惠" :picNum="6"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="准时达" :picNum="7"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="简餐" :picNum="8"></easy-pic-item>
              </div>
            </div>
          </div>
          <div class="page-wrapper">
            <div class="line">
              <div class="item-wrapper">
                <easy-pic-item text="土豪推荐" :picNum="9"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="鲜花蛋糕" :picNum="10"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="汉堡" :picNum="11"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="日韩料理" :picNum="12"></easy-pic-item>
              </div>
            </div>
            <div class="line">
              <div class="item-wrapper">
                <easy-pic-item text="麻辣烫" :picNum="13"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="披萨意面" :picNum="14"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="川湘菜" :picNum="15"></easy-pic-item>
              </div>
              <div class="item-wrapper">
                <easy-pic-item text="包子粥店" :picNum="16"></easy-pic-item>
              </div>
            </div>
          </div>
        </div>
        <div class="show-page">
          <div class="ball" :class="{active: ballNum === 1}"></div>
          <div class="ball" :class="{active: ballNum === 2}"></div>
        </div>
      </div>
      <split class="item-split" :height="8"></split>
      <div class="middle-block">
        <div class="line">
          <div class="block">
            <div class="text">
              <div class="title">天天特价</div>
              <div class="description">美食1折起</div>
            </div>
            <i class="middle"></i>
            <img class="food-img" src="./1.jpg"/>
          </div>
          <div class="block">
            <div class="text">
              <div class="title">霸王餐</div>
              <div class="description">领20元红包</div>
            </div>
            <i class="middle"></i>
            <img class="food-img" src="./2.jpg"/>
          </div>
        </div>
        <div class="line">
          <div class="block">
            <div class="text">
              <div class="title">营养快餐</div>
              <div class="description">15元吃饱</div>
            </div>
            <i class="middle"></i>
            <img class="food-img" src="./3.jpg"/>
          </div>
          <div class="block">
            <div class="text">
              <div class="title">汉堡披萨</div>
              <div class="description">优惠享不停</div>
            </div>
            <i class="middle"></i>
            <img class="food-img" src="./4.jpg"/>
          </div>
        </div>
      </div>
      <split :height="8"></split>
      <div class="flash-sale">
        <div class="line">
          <span class="title">限时抢购</span>
          <span class="text">距离结束</span>
          <div class="timer">
            <div class="timer-box">{{hour}}</div>
            <span class="colon">:</span>
            <div class="timer-box">{{minute}}</div>
            <span class="colon">:</span>
            <div class="timer-box">{{second}}</div>
          </div>
          <span class="more">更多</span>
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <split :height="8"></split>
      <div class="recommend">
        <ShopItem v-for="item in recommend" :item="item" @callReCalc="reCalc" @click.native="goToShop(item.sid, $event)"></ShopItem>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /*
   :name="item.name" :description="item.description" :deliveryTime="item.deliveryTime"
   :score="item." :serviceScore=""  :foodScore="item." :rankRate="item." :minPrice="item."
   :deliveryPrice="item." :ratingCount="item." :sellCount="" :
   */
  import BScroll from 'better-scroll'
  import {mapGetters} from 'vuex'
  import EasyPicItem from '../../../../components/easyPicItem/EasyPicItem.vue'
  import Split from '../../../../components/split/Split.vue'
  import ShopItem from '../../../../components/shopItem/ShopItem.vue'
  function parseAndPadZero (time) {
    time = parseInt(time)
    if (time < 0) return '00'
    if (time >= 0 && time <= 9) {
      return '0' + time
    } else {
      return time
    }
  }
  export default {
    data () {
      return {
        ballNum: 1,
        hour: 0,
        minute: 0,
        second: 0,
        recommend: []
      }
    },
    computed: {
      ...mapGetters([
        'getPos'
      ]),
      getShowAddress () {
        var that = this
        if (this.getPos && typeof this.getPos === 'object') {
          let obj = {
            lat: 30.225327,
            lng: 120.04199
          }
          this.$post('distance', obj).then(function (res) {
            if (res) {
              that.recommend = res
            }
            that.$store.commit('updateLoadingState', false)
            that.$nextTick(() => {
              that.orderScroll.refresh()
            })
          })
          return this.getPos.address
        }
        return '获取中请稍后'
      }
    },
    mounted () {
      let that = this
      this.$store.commit('changeBottomShow', true)
      this.$store.commit('updateLoadingState', true)
      this.getTimerCount()
      this.$nextTick(() => {
        this.orderScroll = new BScroll(this.$refs.orderWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.classifyBoxWrapper, {
          click: true,
          scrollX: true,
          snap: '.page-wrapper'
        })
        this.foodsScroll.on('scrollEnd', function () {
          if (this.x === 0) that.ballNum = 1
          else that.ballNum = 2
        })
      })
    },
    props: [],
    methods: {
      goPosition () {
        this.$router.push({name: 'position'})
      },
      getTimerCount () {
        let date = new Date()
        let timeStamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).valueOf() - date.valueOf()
        this.hour = parseAndPadZero(timeStamp / 1000 / 60 / 60 % 24)
        this.minute = parseAndPadZero(timeStamp / 1000 / 60 % 60)
        this.second = parseAndPadZero(timeStamp / 1000 % 60)
        setTimeout(this.getTimerCount, 1000)
      },
      reCalc () {
        setTimeout(() => {
          this.$nextTick(() => {
            this.orderScroll.refresh()
          })
        }, 250)
      },
      goToShop (sid, event) {
        this.$router.push({
          name: 'shop',
          params: {sid: sid}
        })
      }
    },
    components: {
      EasyPicItem,
      Split,
      ShopItem
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";

  .order-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 50px;
    .container {
      .header {
        background-color: $blue;
        padding: 10px;
        color: #fff;
        .title-line {
          display: flex;
          height: 32px;
          line-height: 32px;
          .iconfont {
            width: 30px;
            font-size: 30px;
            text-align: center;
          }
          .title-wrapper {
            flex: 1;
            .icon-dizhi {
              display: inline-block;
              vertical-align: top;
              font-size: 30px;
            }
            .title {
              display: inline-block;
              vertical-align: top;
              font-size: 16px;
              white-space: nowrap;
              max-width: calc(100% - 50px);
              overflow: hidden;
              text-overflow: ellipsis;
              @media screen and (max-width: 320px) {
                font-size: 14px;
              }
            }
          }
          .weather-wrapper {
            flex: 0 0 40px;
            .temperature {
              font-size: 18px;
              line-height: 18px;
            }
            .weather {
              font-size: 14px;
              line-height: 14px;
            }
          }
          .icon-duoyun {
            flex: 0 0 40px;
            font-size: 30px;
          }
        }
        .search-line {
          margin-top: 10px;
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          border-radius: 30px;
          width: 100%;
          text-align: center;
          .icon-fangdajing {
            display: inline-block;
            margin-top: 3px;
            width: 30px;
            line-height: 30px;
            font-size: 30px;
            color: $grey;
          }
          .text {
            line-height: 30px;
            width: 150px;
            text-align: center;
          }
        }
        .history-line {
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          overflow: hidden;
          .item {
            display: inline-block;
            padding: 5px 10px 0;
          }
        }
      }
      .classify-box-wrapper {
        position: fixed;
        top: 130px;
        left: 0;
        width: 100%;
        height: 200px;
        .classify-box {
          width: 200%;
          white-space: nowrap;
          .page-wrapper {
            display: inline-block;
            box-sizing: border-box;
            width: 50%;
            .line {
              display: flex;
              padding: 10px 0;
              .item-wrapper {
                flex: 1;
              }
            }
          }
        }
        .show-page {
          width: 100%;
          text-align: center;
          .ball {
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #eee;
            &.active {
              background-color: $grey;
            }
          }
        }
      }
      .item-split {
        margin-top: 200px;
      }
      .middle-block {
        .line {
          display: flex;
          border-bottom: 1px solid #eee;
          .block {
            flex: 1;
            height: 50px;
            padding: 10px 0;
            border-right: 1px solid #eee;
            &:last-child {
              border-right: none;
            }
            .text {
              display: inline-block;
              vertical-align: middle;
              margin-left: 10px;
              line-height: 50px;
              .title {
                font-size: 14px;
                line-height: 1;
                margin-bottom: 5px;
              }
              .description {
                line-height: 1;
                color: $grey;
                font-size: 12px;
              }
            }
            .middle {
              display: inline-block;
              line-height: 50px;
              width: 1px;
              height: 50px;
              vertical-align: middle;
            }
            .food-img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              float: right;
              margin-right: 10px;
            }
          }
        }
      }
      .flash-sale {
        padding: 10px;
        .line {
          display: flex;
          line-height: 30px;
          height: 30px;
          .title {
            flex: 0 0 65px;
            font-size: 14px;
          }
          .text, .more {
            font-size: 12px;
            color: $grey;
          }
          .text {
            flex: 0 0 55px;
          }
          .timer {
            flex: 1;
            font-size: 0;
            .timer-box {
              display: inline-block;
              color: #fff;
              background-color: #000;
              line-height: 16px;
              font-size: 12px;
              width: 20px;
              height: 16px;
              text-align: center;
              border-radius: 3px;
            }
            .colon {
              padding: 0 2px;
              font-size: 12px;
            }
          }
          .more {
            flex: 0 0 25px;
          }
          .icon-you {
            flex: 0 0 16px;
            width: 16px;
            height: 16px;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>
