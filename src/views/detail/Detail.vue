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
      <EasyLine title="用户名" :info="getUid.uid"></EasyLine>
    </div>
    <div class="bind" @click="remind()">
      <div class="title">账号绑定</div>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="手机" info="未绑定"></EasyLine>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="微信" info="未绑定"></EasyLine>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="QQ" info="未绑定"></EasyLine>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="微博" info="未绑定"></EasyLine>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="淘宝" info="未绑定"></EasyLine>
    </div>
    <div class="secure">
      <div class="title">安全设置</div>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="登录密码" info="未设置"></EasyLine>
      <EasyLine icon="icon-shezhi" color="#3190e8" title="支付密码" info="未设置"></EasyLine>
      <EasyLine title="小额免密支付"></EasyLine>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import EasyLine from '../../components/easyLine/EasyLine.vue'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    mounted () {

    },
    components: {
      EasyHeader,
      EasyLine
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
      .line {
        padding-left: 10px;
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
  }

</style>
