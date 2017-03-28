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
    methods: {}
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
    .line {
      display: flex;
      height: 45px;
      line-height: 45px;
      padding: 0 10px 0 20px;
      //@include border-1px($bg);
      border-bottom: 1px solid $bg;
      .iconfont {
        margin: 0 10px;
        font-size: 20px;
      }
    }
    .infomation {
      margin-top: 10px;
      background-color: #fff;
      .text {
        font-size: 18px;
        flex: 0 0 100px;
      }
      .avatar-wrapper {
        flex: 1;
        text-align: right;
        .icon-moshengren {
          border-radius: 50%;
          font-size: 25px;
          vertical-align: middle;
          color: white;
          background-color: #66ccff;
        }
      }
      .iconfont.icon-you {
        flex: 0 0 15px;
        margin: 12px 0;
        color: #ccc;
      }
    }
  }

</style>
