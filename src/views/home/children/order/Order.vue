<template>
  <div class="container">
    <div class="header">
      <div class="title-line">
        <div class="title-wrapper">
          <i class="iconfont icon-dizhi"></i>
          <div class="title">西湖区浙江工业大学</div>
          <div class="iconfont icon-xia"></div>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import EasyPicItem from '../../../../components/easyPicItem/EasyPicItem.vue'
  export default {
    data () {
      return {
        ballNum: 1
      }
    },
    mounted () {
      let that = this
      this.$store.commit('changeBottomShow', true)
      this.foodsScroll = new BScroll(this.$refs.classifyBoxWrapper, {
        click: true,
        scrollX: true,
        snap: '.page-wrapper'
      })
      this.foodsScroll.on('scrollEnd', function () {
        if (this.x === 0) that.ballNum = 1
        else that.ballNum = 2
      })
    },
    props: [],
    methods: {},
    components: {
      EasyPicItem
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";

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
            font-size: 20px;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .icon-xia {
            display: inline-block;
            vertical-align: top;
            width: 16px;
            line-height: 30px;
            font-size: 16px;
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
        width: calc(200% + 5px);
        .page-wrapper {
          display: inline-block;
          box-sizing: border-box;
          width: calc((100% - 5px) / 2);
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
  }
</style>
