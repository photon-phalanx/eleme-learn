<template>
  <div id="app">
    <transition name="fade">
      <error-handler class="error-headler" v-if="getErrMsg" :msg="getErrMsg"></error-handler>
    </transition>
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import {host} from 'api/http.js'
  import queryString from 'querystring'
  import ErrorHandler from './components/errorHandler/ErrorHandler.vue'
  import Loading from './components/loading/Loading.vue'
  import {getCurrentPosition} from './api/map.js'

  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {}
    },
    async mounted () {
      window.VueRootComponent = this
      this.getCurrentPosition()
      try {
          let res = await axios.post(host + 'loginP', queryString.stringify({confirm: 'confirm'}))
        console.log(res)
        if (!res.data.r) {
          this.$store.commit('updateUid', res.data.data)
        }
      } catch (e) {
      }
    },
    methods: {
      getCurrentPosition () {
        getCurrentPosition.call(this)
      }
    },
    computed: {
      ...mapGetters([
        'getErrMsg'
      ])
    },
    components: {
      ErrorHandler,
      Loading
    }
  }
</script>

<style>
  @import "assets/css/global.scss";
  input {
    background-color: transparent;
    FILTER: alpha(opacity=0);
  }

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
