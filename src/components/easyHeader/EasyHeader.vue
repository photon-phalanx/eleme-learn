<template>
  <div class="header">
    <div class="title">
      <i class="iconfont" v-if="goBackClass" :class="[goBackClass]" @click="goBack"></i>
      <div class="text">{{title}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: ['goBackClass', 'title'],
    methods: {
      goBack () {
        this.$store.commit('changeSlideWay', 2)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .header {
    background-color: $blue;
    width: 100%;
    color: #fff;
    font-size: 22px;
    .title {
      display: flex;
      height: 40px;
      line-height: 40px;
      font-weight: 500;
      .iconfont {
        flex: 0 0 50px;
        text-align: center;
        font-size: 24px;
        line-height: 32px;
        padding-top: 5px;
      }
      .text {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
