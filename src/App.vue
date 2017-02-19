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
  components: {
    appHeader: header,
    appMiddle: middle
  }
}
</script>

<style>
  @import "assets/css/reset.css";
</style>
