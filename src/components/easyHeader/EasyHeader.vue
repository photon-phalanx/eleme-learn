<template>
  <div class="header">
    <div class="title">
      <i class="iconfont" v-if="goBackClass" :class="[goBackClass]" @click="goBack"></i>
      <div class="text">{{title}}</div>
      <div class="advance" v-if="advance" :style="advance.style" @click="emitAdvanceEvent">{{advance.text}}</div>
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
    // advance对象：{text:'',style:''} text为显示的文字，style为绑定的样式 其点击事件由父组件处理，传递advanceEvent事件
    props: ['goBackClass', 'title', 'advance'],
    methods: {
      goBack () {
        this.$store.commit('changeSlideWay', 2)
        this.$router.go(-1)
      },
      emitAdvanceEvent () {
        this.$emit('emitAdvanceEvent')
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
