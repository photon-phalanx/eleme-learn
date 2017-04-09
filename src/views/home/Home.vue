<template>
  <div>
    <transition :name="getSlideWay">
      <router-view class="container"></router-view>
    </transition>
    <home-footer v-show="getBottomShow"></home-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeFooter from '../../components/homeFooter/HomeFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: [],
    methods: {
    },
    computed: {
      ...mapGetters([
        'getBottomShow',
        'getSlideWay'
      ])
    },
    components: {
      HomeFooter
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    &.slideRL-enter {
      transition: all 0.4s linear;
      transform: translate(100%, 0);
    }
    &.slideRL-enter-to, &.slideRL-leave {
      transition: all 0.4s linear;
      transform: translate(0, 0);
    }
    &.slideRL-leave-to {
      transition: all 0.4s linear;
      transform: translate(-100%, 0);
    }
    &.slideLR-enter {
      transition: all 0.4s linear;
      transform: translate(-100%, 0);
    }
    &.slideLR-enter-to, &.slideLR-leave {
      transition: all 0.4s linear;
      transform: translate(0, 0);
    }
    &.slideLR-leave-to {
      transition: all 0.4s linear;
      transform: translate(100%, 0);
    }
  }
</style>
