<template>
  <div class="item">
    <div class="pic-wrapper">
      <img :src="source" class="pic"/>
    </div>
    <div class="text">{{text}}</div>
    <div class="" v-if="bottomDescription">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // TODO 待完成

  export default {
    data () {
      return {
        source: require('./' + this.picNum + '.jpeg')
      }
    },
    mounted () {

    },
    props: ['text', 'picNum', 'bottomDescription'],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";

  .item {
    .pic-wrapper {
      width: 100%;
      text-align: center;
      .pic {
        width: 50px;
        height: 50px;
      }
    }
    .text {
      display: block;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
