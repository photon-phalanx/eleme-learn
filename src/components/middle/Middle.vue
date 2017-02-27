<template>
  <div class="item border-1px">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/comment">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/sellers">商家</router-link>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../assets/css/mixin';

  .item {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.router-link-active {
           /*这是默认的，在实例化vuerouter的时候可以传参来改变这个active的名字*/
           color: rgb(240,20,20);
         }
      }
    }
    @include border-1px(rgba(7,17,27,0.1));
  }



</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    }
  }
</script>
