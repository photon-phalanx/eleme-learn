<template>
  <div  class="container">
    <router-link to="order" class="order-wrapper">
      <i class="iconfont icon-icon"></i>
      <div class="text">外卖</div>
    </router-link>
    <router-link to="find" class="find-wrapper">
      <i class="iconfont icon-icon"></i>
      <div class="text">发现</div>
    </router-link>
    <router-link to="order-list" class="order-list-wrapper">
      <i class="iconfont icon-icon"></i>
      <div class="text">订单</div>
    </router-link>
    <router-link to="my" class="my-wrapper">
      <i class="iconfont icon-icon"></i>
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
  $blue: #3190e8;
  .container {
    display: flex;
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    z-index: 30;
    > * {
      flex: 1;
      > * {
        text-align: center;
      }
      > .iconfont {
        font-size: 20px;
      }
      > .text {
        font-size: 10px;
        margin: 5px 0;
      }
      .router-link-active {
        color: $blue;
      }
    }

  }


</style>
