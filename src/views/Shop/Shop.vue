<template>
  <div class="container">
    <shop-header></shop-header>
    <shop-middle></shop-middle>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  // TODO 虽然现在还没有写，但是因为用了keep-alive(似乎比我想的vuex要好），但是这样的话内部mounted只做一次，那么新商铺的消息要从外部拿进来，说实话这样bcroll估计都会炸
  // how? 大概是要去watch props！！！
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
