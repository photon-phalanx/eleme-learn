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
    <div class="classify-box-wrapper">
      <div class="classify-box">
        <div class="page-wrapper">
          <div class="line">
            <div class="item">
              <div class="pic-wrapper">
                <img src="./1.jpeg" class="pic"/>
              </div>
              <div class="text">美食</div>
            </div>
            <div class="item">
              <div class="pic-wrapper">
                <img src="./2.jpeg" class="pic"/>
              </div>
              <div class="text">甜品饮品</div>
            </div>
            <div class="item">
              <div class="pic-wrapper">
                <img src="./3.jpeg" class="pic"/>
              </div>
              <div class="text">商超便利</div>
            </div>
            <div class="item">
              <div class="pic-wrapper">
                <img src="./4.jpeg" class="pic"/>
              </div>
              <div class="text">预定早餐</div>
            </div>
          </div>
          <div class="line">
            <div class="item">
              <div class="pic-wrapper">
                <img src="./1.jpeg" class="pic"/>
              </div>
              <div class="text">美食</div>
            </div>
            <div class="item">
              <div class="pic-wrapper">
                <img src="./2.jpeg" class="pic"/>
              </div>
              <div class="text">甜品饮品</div>
            </div>
            <div class="item">
              <div class="pic-wrapper">
                <img src="./3.jpeg" class="pic"/>
              </div>
              <div class="text">商超便利</div>
            </div>
            <div class="item">
              <div class="pic-wrapper">
                <img src="./4.jpeg" class="pic"/>
              </div>
              <div class="text">预定早餐</div>
            </div>
          </div>
        </div>
        <div class="page-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {
      this.$store.commit('changeBottomShow', true)
    },
    props: [],
    methods: {},
    components: {}
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
      height: 300px;
      background-color: #ee0000;
      .classify-box {
        .page-wrapper {
          .line {
            display: flex;
            padding: 10px 0;
            .item {
              flex: 1;
              text-align: center;
              .pic-wrapper {
                width: 100%;
                text-align: center;
                .pic {
                  width: 50px;
                  height: 50px;
                }
              }
              .text {
                display: block;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
</style>
