<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods">
          <span class="text">
            <i v-if="item.type > 0"></i>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px; //android兼容
      background-color: #f3f5f7;
    }
    .foods-wrapper {
      flex: 1;
    }
  }
</style>
<script type="text/ecmascript-6">
  import Icon from '../icon/Icon.vue'
  export default{
    data () {
      return {}
    },
    props: ['goods'],
    components: {
      Icon
    }
  }
</script>
