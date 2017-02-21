<template>
  <div id="app">
    <app-header></app-header>
    <app-middle></app-middle>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/Header.vue'
  import middle from './components/middle/Middle.vue'

  export default {
    name: 'app',
    data () {
      return {
        seller: ''
      }
    },
    async mounted () {
      let seller = await this.$http.get('seller')
      this.seller = seller
    },
    components: {
      appHeader: header,
      appMiddle: middle
    }
  }
</script>

<style>
  @import "assets/css/global.scss";
</style>
