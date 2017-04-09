<template>
  <div class="split" :style="{height: height + 'px' }"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: {
      height: {
        type: Number,
        default: 16
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .split {
    // height: 16px;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background-color: #f3f5f7;
  }
</style>
