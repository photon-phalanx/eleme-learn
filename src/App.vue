<template>
  <div id="app">
    <error-handler v-if="getErrMsg" :msg="getErrMsg"></error-handler>
    <app-header :seller="seller"></app-header>
    <app-middle :goods="goods"></app-middle>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/Header.vue'
  import middle from './components/middle/Middle.vue'
  import errorHandler from './components/errorHandler/ErrorHandler.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        seller: '',
        goods: '',
        star: ''
      }
    },
    computed: {
      ...mapGetters([
        'getErrMsg'
      ])
    },
    async mounted () {
      [this.seller, this.goods, this.star] = await Promise.all([this.$get('seller'), this.$get('goods'), this.$get('ratings')])
    },
    components: {
      appHeader: header,
      appMiddle: middle,
      errorHandler
    }
  }
</script>

<style>
  @import "assets/css/global.scss";
</style>
