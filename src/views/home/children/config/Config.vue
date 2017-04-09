<template>
  <div class="container">
    <easy-header goBackClass="icon-fangxiang" title="设置"></easy-header>
    <split></split>
    <div> <!--做这个div包裹是为了每个div最后的easy-line不要下划线-->
      <easy-line title="账户与安全"></easy-line>
      <easy-line title="通用"></easy-line>
    </div>
    <split></split>
    <div>
      <easy-line title="关于饿了么"></easy-line>
    </div>
    <split></split>
    <button class="logout-button" @click="logout">退出登录</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../../../components/easyHeader/EasyHeader.vue'
  import EasyLine from '../../../../components/easyLine/EasyLine.vue'
  import Split from '../../../../components/split/Split.vue'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.$store.commit('changeBottomShow', false)
    },
    components: {
      EasyHeader,
      EasyLine,
      Split
    },
    props: [],
    methods: {
      async logout () {
        let res = await this.$post('logout')
        if (res) {
          this.$store.commit('updateUid', undefined)
          this.$router.push({name: 'my'})
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color";

  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $bg;
    .logout-button {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: #ee0000;
      background-color: #fff;
      border: none;
      &:active {
        background-color: #f3f5f7;
      }
    }
  }
</style>
