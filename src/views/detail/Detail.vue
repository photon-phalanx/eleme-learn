<template>
  <div class="container">
    <easy-header goBackClass="icon-fangxiang" title="账户信息"></easy-header>
    <div class="infomation">
      <div class="line avatar-line">
        <span class="text">头像</span>
        <div class="avatar-wrapper">
          <i v-if="!getUid.avatar" class="iconfont icon-moshengren"></i>
          <img v-else src="" class="avatar"/>
        </div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line user">
        <span class="text">用户名</span>
        <span class="uid">{{getUid.uid}}</span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="bind" @click="remind()">
      <div class="title">账号绑定</div>
      <div class="line phone">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">手机</div>
        <div class="data">未绑定</div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line weixin">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">微信</div>
        <div class="data">未绑定</div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line qq">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">QQ</div>
        <div class="data">未绑定</div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line weibo">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">微博</div>
        <div class="data">未绑定</div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line taobao">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">淘宝</div>
        <div class="data">未绑定</div>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div class="secure">
      <div class="title">安全设置</div>
      <div class="line login">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">登录密码</div>
        <div class="data">未设置</div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line pay">
        <i class="iconfont icon-shezhi"></i>
        <div class="text">支付密码</div>
        <div class="data">未设置</div>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="line no-pw">
        <div class="small-pay">小额免密支付</div>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    mounted () {

    },
    components: {
      EasyHeader
    },
    computed: {
      ...mapGetters([
        'getUid'
      ])
    },
    props: [],
    methods: {
      remind () {
        this.$store.commit('commitMsg', '感谢使用，暂未实现')
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $bg;
    .title {
      background-color: transparent;
      padding: 10px 0 10px 20px;
      font-size: 14px;
    }
    .line {
      display: flex;
      padding-right: 10px;
      height: 45px;
      line-height: 45px;
      //@include border-1px($bg);
      border-bottom: 1px solid $bg;
      background-color: #fff;
    }
    .text {
      font-size: 18px;
      flex: 0 0 100px;
    }
    .data {
      font-size: 18px;
      flex: 1;
      text-align: right;
      color: $blue;
    }
    .iconfont.icon-you {
      flex: 0 0 20px;
      margin: 12px 0 0 5px;
      color: #ccc;
    }
    .infomation {
      margin-top: 10px;
      .line {
        padding-left: 20px;
      }
      .avatar-wrapper {
        flex: 1;
        text-align: right;
        .icon-moshengren {
          margin: 0 10px;
          border-radius: 50%;
          font-size: 25px;
          vertical-align: middle;
          color: white;
          background-color: #66ccff;
        }
      }
      .uid {
        flex: 1;
        text-align: right;
      }
    }
    .bind,.secure {
      .icon-shezhi {
        flex: 0 0 50px;
        text-align: center;
        margin-top: 14px;
      }
      .small-pay {
        flex: 1;
        background-color: #fff;
        margin-left: 20px;
      }
    }
  }

</style>
