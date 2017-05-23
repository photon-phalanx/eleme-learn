<template>
  <div class="container" v-if="showFlag">
    <shop-header></shop-header>
    <shop-middle></shop-middle>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  // TODO seller界面还有未完成事项，关于拿到url的，这个url的设计想放到vue router里
  // 去watch 这个getter,prop什么的我在想什么…… 2017.4.14 watch需要吗？ 因为shop会被销毁呀，正常访问不存在改变地址跳转的情况吧
  import Header from '../../components/header/Header.vue'
  import Middle from '../../components/middle/Middle.vue'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        showFlag: false
      }
    },
    async mounted () {
      let query = this.$router
      console.log(query)
      this.$store.commit('updateLoadingState', true)
      let [seller, goods, ratings] = await Promise.all([this.$get('seller'), this.$get('goods'), this.$get('ratings')])
      this.$store.commit('updateSeller', seller)
      this.$store.commit('updateGoods', goods)
      this.$store.commit('updateRatings', ratings)
      this.$store.commit('updateLoadingState', false)
      this.showFlag = true
    },
    computed: {
      ...mapGetters([
        'getLoadingState'
      ])
    },
    watch: {
      getSeller () {
        console.log(this)
        console.log('change')
      }
    },
    props: [],
    methods: {},
    components: {
      ShopHeader: Header,
      ShopMiddle: Middle
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
