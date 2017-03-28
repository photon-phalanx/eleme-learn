<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <i class="iconfont icon-iconfontnaoling"></i>
        <div class="text">我的</div>
        <i class="iconfont icon-shezhi"></i>
      </div>
      <router-link :to="{name: 'login'}" v-if="!getUid" class="no-login-wrapper">
        <i class="iconfont icon-moshengren"></i>
        <div class="content">
          <div class="main-text">立刻登录</div>
          <div class="info">登录后可享受更多特权</div>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
      <router-link :to="{name: 'detail'}" v-else class="login-wrapper">
        <i class="iconfont icon-moshengren" v-if="getUid.avatar"></i>
        <i v-else></i>
        <div class="content">
          <div class="uid">{{getUid.uid}}</div>
          <div class="tel">
            <i></i>
            <span class="tel-number">{{getUid.phoneNumber}}</span>
          </div>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
    </div>
    <div class="service">
      <div class="remain-wrapper">
        <i class="iconfont icon-yue"></i>
        <div class="text">余额</div>
      </div>
      <div class="discount-wrapper">
        <i class="iconfont icon-hongbao"></i>
        <div class="text">优惠</div>
      </div>
      <div class="point-wrapper">
        <i class="iconfont icon-jifen"></i>
        <div class="text">积分</div>
      </div>
    </div>
    <div class="block1">
      <div class="line address ">
        <i class="iconfont icon-dizhi"></i>
        <span class="text">收货地址</span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line favorite ">
        <i class="iconfont icon-weibiaoti2"></i>
        <span class="text">我的收藏</span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line album ">
        <i class="iconfont icon-icon"></i>
        <span class="text">美食相册</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="block2">
      <div class="line shop">
        <i class="iconfont icon-shangcheng-copy-copy"></i>
        <span class="text">积分商城</span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line mem-card ">
        <i class="iconfont icon-huangguan"></i>
        <span class="text">饿了么会员卡</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="block3">
      <div class="line address ">
        <i class="iconfont icon-dizhi"></i>
        <span class="text">服务中心</span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line favorite ">
        <i class="iconfont icon-weibiaoti2"></i>
        <span class="text">欢迎评分</span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line album ">
        <i class="iconfont icon-icon"></i>
        <span class="text">加盟合作</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    computed: {
      ...mapGetters([
        'getUid'
      ])
    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";

  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $bg;
    .header {
      background-color: $blue;
      width: 100%;
      color: #fff;
      font-size: 22px;
      .title {
        display: flex;
        height: 40px;
        line-height: 40px;
        font-weight: 500;
        .iconfont {
          flex: 0 0 50px;
          text-align: center;
          font-size: 24px;
          line-height: 32px;
        }
        .text {
          flex: 1;
          text-align: center;
        }
      }
      .no-login-wrapper {
        display: flex;
        height: 80px;
        color: #fff;
        .icon-moshengren {
          flex: 0 0 100px;
          font-size: 60px;
          line-height: 80px;
          border-radius: 50%;
          background-color: #3190e8;
          margin: -10px 0 0 10px;
        }
        .content {
          flex: 1;
          padding: 12px 0;
          .main-content {
            font-size: 16px;
            font-weight: 500;
            line-height: 40px;
          }
          .info {
            margin-top: 3px;
            font-size: 10px;
            line-height: 20px;
          }
        }
        .icon-you {
          flex: 0 0 30px;
          margin: -5px 5px 0 0;
          font-size: 25px;
          line-height: 80px;
          font-weight: 500;
        }
      }
    }
    .service {
      display: flex;
      padding: 15px 10px;
      background-color: #fff;
      .iconfont {
        border-radius: 50%;
        padding: 8px;
        color: #fff;
        line-height: 40px;
      }
      .text {
        font-size: 13px;
        line-height: 25px;
        height: 25px;
      }
      .remain-wrapper {
        flex: 1;
        text-align: center;
        .iconfont {
          font-size: 20px;
          background-color: #f90;
        }
      }
      .discount-wrapper {
        flex: 1;
        text-align: center;
        .iconfont {
          font-size: 20px;
          background-color: #ff5f3e;
        }
      }
      .point-wrapper {
        flex: 1;
        text-align: center;
        .iconfont {
          font-size: 20px;
          background-color: $green;
        }
      }
    }
    .block1 {
      margin-top: 10px;
      background-color: #fff;
      .line {
        height: 45px;
        line-height: 45px;
        //@include border-1px($bg);
        border-bottom: 1px solid $bg;
        .iconfont {
          margin: 0 10px;
          font-size: 20px;
        }
      }
      .text {
        font-size: 18px;
      }
      .address {
        .iconfont {
          color: $blue;
        }
      }
      .favorite {
        .iconfont {
          color: #ff5f3e;
        }
      }
      .album {
        .iconfont {
          color: $blue;
        }
      }
      .iconfont.icon-you {
        float: right;
        margin: 12px 10px;
        color: #ccc;
      }
    }
    .block2 {
      margin-top: 10px;
      background-color: #fff;
      .line {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid $bg;
        .iconfont {
          margin: 0 10px;
          font-size: 20px;
        }
      }
      .text {
        font-size: 18px;
      }
      .shop {
        .iconfont {
          color: $green;
        }
      }
      .mem-card {
        .iconfont {
          color: gold;
        }
      }
      .iconfont.icon-you {
        float: right;
        margin: 12px 10px;
        color: #ccc;
      }
    }
    .block3 {
      margin-top: 10px;
      background-color: #fff;
      .line {
        height: 45px;
        line-height: 45px;
        //@include border-1px($bg);
        border-bottom: 1px solid $bg;
        .iconfont {
          margin: 0 10px;
          font-size: 20px;
          color: $blue;
        }
      }
      .text {
        font-size: 18px;
      }
      .iconfont.icon-you {
        float: right;
        margin: 12px 10px;
        color: #ccc;
      }
    }
  }
</style>
