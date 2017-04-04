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
  import ErrorHandler from './components/errorHandler/ErrorHandler.vue'
  import Loading from './components/loading/Loading.vue'

  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {}
    },
    async mounted () {
      try {
        let res = await axios.post(host + 'login')
        console.log(res)
        if (!res.data.r) {
          this.$store.commit('updateUid', res.data.data)
        }
      } catch (e) {
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
