<template>
  <div class="container">
    <login-remind v-if="!getUid" content="登录后查看早餐订单"></login-remind>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import LoginRemind from '../../../../../../components/loginRemind/LoginRemind.vue'
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    computed: {
      ...mapGetters([
        'getUid'
      ])
    },
    components: {
      LoginRemind
    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
