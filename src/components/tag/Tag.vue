<template>
  <div class="tag">
    {{title}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: ['title'],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .tag {
    display: inline-block;
    padding: 5px 20px;
    font-size: 14px;
    color: $text;
    border-radius: 5px;
    @media only screen and (max-width: 320px) {
      padding: 5px 10px;
    }
  }
</style>
