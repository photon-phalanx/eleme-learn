<template>
  <!--可能已经完成，待测试-->
  <div class="container">
    <div class="placeholder">
    </div>
    <div class="main-content">
      <div>asa</div>
      <div class="text">{{content}}</div>
      <button class="login" @click="commitSlideAndGo('login')">立即登录</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    props: ['content'],
    methods: {
      commitSlideAndGo (location) {
        this.$store.commit('changeSlideWay', 1)
        this.$router.push({name: location})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  .container {
    width: 100%;
    height: 1000px;
    background-color: $bg;
    padding-top: 45%;
    .main-content {
      width: 60%;
      margin: auto;
      text-align: center;
      .text {
        margin: 15px 0;
        font-size: 18px;
      }
      .login {
        width: 60%;
        line-height: 30px;
        background-color: $green;
        color: #fff;
        font-size: 16px;
        border: none;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
</style>
