<template>
  <div class="container">
    <router-view></router-view>
    <home-footer></home-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeFooter from '../../components/homeFooter/HomeFooter.vue'

  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: [],
    methods: {},
    components: {
      HomeFooter
    }
  }
</script>

<style lang="scss" scoped>

</style>
