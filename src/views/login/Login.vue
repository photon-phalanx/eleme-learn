<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <i class="iconfont icon-iconfontnaoling"></i>
        <div class="text">登录</div>
        <div class="password">密码登录</div>
      </div>
    </div>
    <div class="main">
      <div class="phone-line">
        <input type="text" class="telephone" placeholder="手机号"/>
        <button class="auth-button">获取验证码</button>
      </div>
      <input type="password" class="password" placeholder="验证码"/>
    </div>
    <div class="info">温馨提示，未注册饿了么的手机号，登陆时将自动注册，切代表您已同意《<a>用户服务协议</a>》</div>
    <div class="button-wrapper">
      <button class="login-button">登录</button>
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
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $bg;
    .header {
      background-color: $blue;
      width: 100%;
      color: #fff;
      font-size: 22px;
      .title {
        display: flex;
        height: 40px;
        line-height: 40px;
        font-weight: 500;
        .iconfont {
          flex: 0 0 50px;
          text-align: center;
          font-size: 24px;
          line-height: 32px;
        }
        .text {
          flex: 1;
          text-align: center;
        }
        .password {
          flex: 0 0 90px;
          font-size: 18px;
        }
      }
    }
    .main {
      background-color: #fff;
      margin-top: 10px;
      .phone-line {
        display: flex;
        .telephone {
          flex: 2;
          margin-right: 10px;
          line-height: 40px;
          height: 40px;
          padding: 0 10px;
          border-bottom: 1px solid $bg;
        }
        .auth-button {
          flex: 1;
          margin-right: 5px;
          line-height: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
          background-color: #ccc; // 这个的样式要动态绑定了，现在只是暂时做一个测试罢了
        }
      }
      .password {
        width: 100%;
        line-height: 40px;
        height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid $bg;
      }
    }
    .info {
      width: 90%;
      margin: 10px auto ;
      line-height: 14px;
      font-size: 12px;
      color: #666;
      a {
        color: $blue;
      }
    }
    .button-wrapper {
      .login-button {
        display: block;
        width: 90%;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background-color: $green;
        color: #fff;
        border-radius: 8px;
        border: none;
        text-align: center;
      }
    }
  }
</style>
