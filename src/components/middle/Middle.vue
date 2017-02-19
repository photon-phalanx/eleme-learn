<template>
  <div class="item">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/star">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/sellers">商家</router-link>
    </div>
  </div>
</template>
<style scoped>
  .item {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .item .tab-item {
    flex: 1;
    text-align: center;
  }

  .item .tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }

  /*这是默认的，在实例化vuerouter的时候可以传参来改变这个active的名字*/
  .item .tab-item a.router-link-active {
    color: rgb(240,20,20);
  }

</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    }
  }
</script>
