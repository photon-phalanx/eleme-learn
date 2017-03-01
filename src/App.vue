<template>
  <div id="app">
    <error-handler v-if="getErrMsg" :msg="getErrMsg"></error-handler>
    <app-header></app-header>
    <app-middle></app-middle>
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
      }
    },
    computed: {
      ...mapGetters([
        'getErrMsg'
      ])
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
