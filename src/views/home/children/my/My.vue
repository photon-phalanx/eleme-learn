<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <i class="iconfont icon-iconfontnaoling"></i>
        <div class="text">我的</div>
        <router-link :to="{name: 'config'}" class="iconfont icon-shezhi"></router-link>
      </div>
      <router-link :to="{name: 'login'}" v-if="!getUid" class="no-login-wrapper">
        <div class="avatar-wrapper">
          <i class="iconfont icon-moshengren"></i>
        </div>
        <div class="content">
          <div class="main-text">立刻登录</div>
          <div class="info">登录后可享受更多特权</div>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
      <router-link :to="{name: 'detail'}" v-else class="login-wrapper">
        <div class="avatar-wrapper">
          <i class="iconfont icon-moshengren" v-if="!getUid.avatar"></i>
          <img class="avatar" v-else :src="getUid.avatar"/>
        </div>
        <div class="content">
          <div class="main-text">{{getUid.uid}}</div>
          <div class="info">
            <i v-if="getUid.pNumber" class="iconfont icon-shouji"></i>
            <span class="tel-number">{{getUid.pNumber}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="content-wrapper" ref="contentWrapper">
      <div class="content">
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
        <div class="block">
          <EasyLine icon="icon-dizhi" color="#3190e8" title="收货地址"></EasyLine>
          <EasyLine icon="icon-weibiaoti2" color="#ff5f3e" title="我的收藏"></EasyLine>
          <EasyLine v-if="!getUid" icon="icon-icon" color="#3190e8" title="美食相册"></EasyLine>
        </div>
        <div class="block">
          <EasyLine v-if="getUid" icon="icon-liwu" color="#ee0000" title="推荐有奖"></EasyLine>
          <EasyLine icon="icon-shangcheng-copy-copy" color="#4cd964" title="积分商城"></EasyLine>
          <EasyLine icon="icon-huangguan" color="#ffd700" title="饿了么会员卡"></EasyLine>
        </div>
        <div class="block">
          <EasyLine icon="icon-dizhi" color="#3190e8" title="服务中心"></EasyLine>
          <EasyLine icon="icon-weibiaoti2" color="#3190e8" title="欢迎评分"></EasyLine>
          <EasyLine icon="icon-icon" color="#3190e8" title="加盟合作"></EasyLine>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import EasyLine from '../../../../components/easyLine/EasyLine.vue'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {}
    },
    mounted () {
      this.$store.commit('changeBottomShow', true)
      this.$nextTick(() => {
        this.contentScroll = new BScroll(this.$refs.contentWrapper, {
          click: true
        })
      })
    },
    computed: {
      ...mapGetters([
        'getUid'
      ])
    },
    props: [],
    methods: {},
    components: {
      EasyLine
    },
    beforeRouteLeave ({name}, from, next) {
      if (name === 'find' || name === 'order' || name === 'breakfast' || name === 'take-away') {
        this.$store.commit('changeSlideWay', 0)
      } else {
        this.$store.commit('changeSlideWay', 1)
      }
      next()
    }
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
    transition: all 0.4s linear;
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
          color: #fff;
        }
        .text {
          flex: 1;
          text-align: center;
        }
      }
      .no-login-wrapper, .login-wrapper {
        display: flex;
        height: 80px;
        color: #fff;
        .avatar-wrapper {
          flex: 0 0 80px;
          text-align: center;
          line-height: 80px;
        }
        .avatar {
          display: inline-block;
          width: 60px;
          height: 60px;
          line-height: 60px;
          border-radius: 50%;
        }
        .icon-moshengren {
          font-size: 40px;
          padding: 10px;
          border-radius: 50%;
          background-color: #66ccff;
        }
        .content {
          flex: 1;
          padding: 12px 0;
          vertical-align: middle;
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
      .login-wrapper {
        .info {
          margin-top: 5px !important;
          .iconfont {
            margin: 3px;
          }
        }
      }
    }
    .content-wrapper {
      position: absolute;
      left: 0;
      top: 120px;
      width: 100%;
      bottom: 50px;
      overflow: hidden;
      .content {
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
        .block {
          margin-top: 10px;
          background-color: #fff;
        }
      }
    }
  }
</style>
