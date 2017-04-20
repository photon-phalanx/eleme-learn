<template>
  <div class="footer">
    <div class="item order-wrapper" @click="commitSlideAndGo('order')" :class="{'router-link-active': activeRoute === 'order'}">
      <i class="iconfont icon-icon"></i>
      <div class="text">外卖</div>
    </div>
    <div class="item find-wrapper" @click="commitSlideAndGo('find')" :class="{'router-link-active': activeRoute === 'find'}">
      <i class="iconfont icon-faxian"></i>
      <div class="text">发现</div>
    </div>
    <div class="item order-list-wrapper" @click="commitSlideAndGo('take-away')" :class="{'router-link-active': activeRoute === 'take-away'}">
      <!--take-away是order-list里面的，但是orderlist已经没有名字了-->
      <i class="iconfont icon-cshy-orders"></i>
      <div class="text">订单</div>
    </div>
    <div class="item my-wrapper" @click="commitSlideAndGo('my')" :class="{'router-link-active': activeRoute === 'my'}">
      <i class="iconfont icon-wode"></i>
      <div class="text">我的</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeRoute: ''
      }
    },
    mounted () {
      this.activeRoute = this.$router.currentRoute.name
    },
    props: [],
    methods: {
      commitSlideAndGo (location) {
        this.$store.commit('changeSlideWay', 0)
        this.$router.push({name: location})
        this.activeRoute = this.$router.currentRoute.name
      }
    }
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
