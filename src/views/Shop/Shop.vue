<template>
  <div class="container">
    <shop-header></shop-header>
    <shop-middle></shop-middle>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header/Header.vue'
  import Middle from '../../components/middle/Middle.vue'
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: [],
    methods: {},
    components: {
      ShopHeader: Header,
      ShopMiddle: Middle
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
