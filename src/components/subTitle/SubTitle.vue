<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .title {
    display: flex;
    width: 80%;
    margin: auto;
    .line {
      flex: 1;
      position: relative;
      top: -6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .text {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    },
    props: ['title'],
    components: {}
  }
</script>
