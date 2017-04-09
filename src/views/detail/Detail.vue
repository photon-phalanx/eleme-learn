<template>
  <div class="container">
    <easy-header goBackClass="icon-fangxiang" title="账户信息"></easy-header>
    <div class="infomation">
      <div class="line avatar-line">
        <span class="text">头像</span>
        <div class="avatar-wrapper">
          <i v-if="!getUid.avatar" class="iconfont icon-moshengren"></i>
          <img v-else :src="getUid.avatar" class="avatar"/>
        </div>
        <i class="iconfont icon-you"></i>
        <div class="real-logic">
          <pic-chipper></pic-chipper>
        </div>
      </div>
      <EasyLine title="用户名" :info="getUid.uid"></EasyLine>
    </div>
    <div class="bind" @click="remind()">
      <div class="title">账号绑定</div>
      <EasyLine icon="icon-shouji" v-if="getUid.pNumber" title="手机" :info="getUid.pNumber"></EasyLine>
      <EasyLine icon="icon-shouji" v-else color="#3190e8" title="手机" info="未绑定"></EasyLine>
      <EasyLine icon="icon-weixin" color="#62b900" title="微信" info="未绑定" infoColor="#3190e8"></EasyLine>
      <EasyLine icon="icon-111" color="#000000" title="QQ" info="未绑定" infoColor="#3190e8"></EasyLine>
      <EasyLine icon="icon-unie61d" color="#ee0000" title="微博" info="未绑定" infoColor="#3190e8"></EasyLine>
      <EasyLine icon="icon-taobao" color="#FF6600" title="淘宝" info="未绑定" infoColor="#3190e8"></EasyLine>
    </div>
    <div class="secure">
      <div class="title">安全设置</div>
      <EasyLine title="登录密码" info="未设置" infoColor="#3190e8"></EasyLine>
      <EasyLine title="支付密码" info="未设置" infoColor="#3190e8"></EasyLine>
      <EasyLine title="小额免密支付"></EasyLine>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import EasyLine from '../../components/easyLine/EasyLine.vue'
  import PicChipper from '../../components/picChipper/PicChipper.vue'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    mounted () {

    },
    components: {
      EasyHeader,
      EasyLine,
      PicChipper
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
    .iconfont.icon-you {
      flex: 0 0 30px;
      font-size: 25px;
      line-height: 45px;
      color: #ccc;
      text-align: right;
    }
    .infomation {
      margin-top: 10px;
      .avatar-line {
        position: relative;
        padding-left: 10px;
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
          .avatar {
            display: inline-block;
            width: 45px;
            height: 45px;
            line-height: 45px;
            border-radius: 50%;
          }
        }
        .real-logic {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .uid {
        flex: 1;
        text-align: right;
      }
    }
  }

</style>
