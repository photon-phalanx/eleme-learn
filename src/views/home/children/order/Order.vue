<template>
  <div class="container">order
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {
      this.$store.commit('changeBottomShow', true)
    },
    props: [],
    methods: {},
    components: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";

  .container {
  }
</style>
