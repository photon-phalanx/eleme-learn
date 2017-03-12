<template>
  <div id="app">
    <transition name="fade">
      <error-handler class="error-headler" v-if="getErrMsg" :msg="getErrMsg"></error-handler>
    </transition>
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
      return {}
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

  .error-headler {
    opacity: 1;
    transition: all 0.5s;
  }

  .error-headler.fade-enter, .error-headler.fade-leave-to {
    opacity: 0;
  }

  .error-headler.fade-leave, .error-headler.fade-enter-to {
    opacity: 1;
  }
</style>
