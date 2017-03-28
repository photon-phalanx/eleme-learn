<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <i class="iconfont icon-iconcha" @click="$router.go(-1)"></i>
        <div class="text">登录</div>
        <router-link :to="{name: 'pwLogin'}" class="password">密码登录</router-link>
      </div>
    </div>
    <div class="main">
      <div class="phone-line">
        <input type="text" class="telephone" v-model="obj.phoneNumber" placeholder="手机号"/>
        <button class="auth-button" :disabled="disabled" :class="{disabled:disabled}" @click="getAuth">{{comText}}
        </button>
      </div>
      <input type="text" class="password" v-model="obj.vCode" placeholder="验证码"/>
    </div>
    <div class="info">温馨提示，未注册饿了么的手机号，登陆时将自动注册，切代表您已同意《<a>用户服务协议</a>》</div>
    <div class="button-wrapper">
      <button class="login-button">登录</button>
    </div>
    <div class="remind">没收到短信验证码？请尝试获取<a>语音验证码</a></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        obj: {
          phoneNumber: '',
          vCode: ''
        },
        count: -2,
        disabled: false
      }
    },
    computed: {
      comText () {
        if (this.count === -2) {
          return '获取验证码'
        } else if (this.count === -1) {
          return '重新获取'
        } else {
          return `已发送(${this.count}s)`
        }
      }
    },
    mounted () {

    },
    props: [],
    methods: {
      getAuth () {
        if (this.disabled) return
        let that = this
        this.disabled = true
        this.$store.commit('updateUid', {uid: 12324})
        // ajax
        this.count = 30
        let timeCount = setInterval(function () {
          that.count--
          if (that.count < 0) {
            clearInterval(timeCount)
            that.disabled = false
          }
        }, 1000)
      }
    }
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
      font-size: 21px;
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
          padding: 4px;
        }
        .text {
          flex: 1;
          text-align: center;
        }
        .password {
          flex: 0 0 90px;
          font-size: 18px;
          color: #fff;
        }
      }
    }
    .main {
      background-color: #fff;
      margin-top: 10px;
      .phone-line {
        display: flex;
        .telephone {
          flex: 5;
          margin-right: 10px;
          line-height: 40px;
          height: 40px;
          padding: 0 10px;
          border-bottom: 1px solid $bg;
        }
        .auth-button {
          flex: 3;
          margin: 4px 5px 0 0;
          line-height: 32px;
          font-size: 20px;
          height: 32px;
          border-radius: 8px;
          border: none;
          vertical-align: middle;
          background-color: blue;
          color: #fff;
          &.disabled {
            background-color: #bbb;
            cursor: not-allowed;
          }
          &:active {
            border: none;
          }
        }
      }
      .password {
        width: 100%;
        box-sizing: border-box;
        line-height: 40px;
        height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid $bg;
      }
    }
    .info {
      width: 90%;
      margin: 10px auto;
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
    .remind {
      font-size: 10px;
      text-align: center;
      margin: 10px;
      a {
        color: $blue;
      }
    }
  }
</style>
