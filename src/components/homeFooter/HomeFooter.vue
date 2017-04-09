<template>
  <div class="footer">
    <router-link :to="{name: 'order'}" class="item order-wrapper">
      <i class="iconfont icon-icon"></i>
      <div class="text">外卖</div>
    </router-link>
    <router-link :to="{name: 'find'}" class="item find-wrapper">
      <i class="iconfont icon-faxian"></i>
      <div class="text">发现</div>
    </router-link>
    <router-link :to="{name: 'take-away'}" class="item order-list-wrapper"> <!--take-away是order-list里面的，但是orderlist已经没有名字了-->
      <i class="iconfont icon-cshy-orders"></i>
      <div class="text">订单</div>
    </router-link>
    <router-link :to="{name: 'my'}" class="item my-wrapper">
      <i class="iconfont icon-wode"></i>
      <div class="text">我的</div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  .footer {
    display: flex;
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    z-index: 30;
    background-color: #fff;
    .item {
      flex: 1;
      text-align: center;
      color: #333;
      .iconfont {
        display: inline-block;
        padding: 4px 0;
        font-size: 24px;
      }
      .text {
        font-size: 14px;
      }
      &.router-link-active {
        color: $blue;
      }
    }
  }


</style>
