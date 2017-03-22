<template>
  <div class="container">
    <easy-header title="订单"></easy-header>
    <div class="route-group">
      <router-link :to="{name: 'take-away'}" class="route"><span class="text">外卖</span></router-link>
      <router-link :to="{name: 'breakfast'}" class="route"><span class="text">早餐</span></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../../../components/easyHeader/EasyHeader.vue'
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    components: {
      EasyHeader
    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  .container {
    .route-group {
      display: flex;
      height: 40px;
      line-height: 40px;
      .route {
        flex: 1;
        font-size: 16px;
        text-align: center;
        color: #000000;
        .text {
          display: inline-block;
          line-height: 20px;
          padding-bottom: 3px;
          font-weight: lighter;
        }
        &:first-child {
          border-right: 1px solid $bg;
        }
        &.router-link-active .text {
          color: $blue;
          border-bottom: 1px solid $blue;
        }
      }
    }
  }
</style>
