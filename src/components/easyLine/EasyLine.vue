<template>
  <div class="line">
    <i class="iconfont left-icon" v-if="icon" :class="icon" :style="{color: color}"></i>
    <span class="title">{{title}}</span>
    <span class="info" v-if="info">{{info}}</span>
    <i class="iconfont icon-you"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  // title是名字，info是具体的比如5元现金什么的，color是icon的颜色，icon是icon的名字
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: ['title', 'color', 'info', 'icon'],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .line {
    display: flex;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid $bg;
    padding: 0 10px;
    font-size: 18px;
    .iconfont {
      font-size: 20px;
    }
    .left-icon {
      flex: 0 0 35px;
      margin-top: 10px;
    }
    .title {
      flex: 1;
    }
    .info {
      flex: 0 0 100px;
      text-align: right;
    }
    .icon-you {
      flex: 0 0 30px;
      font-size: 25px;
      line-height: 45px;
      color: #ccc;
      text-align: right;
    }
  }
</style>
