<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <i class="iconfont icon-iconcha" @click="goBack"></i>
        <div class="text">登录</div>
        <span @click="goPwLogin" class="password">密码登录</span>
      </div>
    </div>
    <div class="main">
      <div class="phone-line">
        <input type="text" class="telephone" v-model="obj.pNumber" placeholder="手机号"/>
        <button class="auth-button" :disabled="disabled" :class="{disabled:disabled}" @click="getAuth">{{comText}}
        </button>
      </div>
      <input type="text" class="password" v-model="obj.vCode" placeholder="验证码"/>
    </div>
    <div class="info">温馨提示，未注册饿了么的手机号，登陆时将自动注册，切代表您已同意《<a>用户服务协议</a>》</div>
    <div class="button-wrapper">
      <button class="login-button" @click="login" :disabled="loginDisabled" :class="{disabled:loginDisabled}">登录</button>
    </div>
    <div class="remind">没收到短信验证码？请尝试获取<a>语音验证码</a></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        obj: {
          pNumber: '',
          vCode: ''
        },
        count: -2,
        disabled: false,
        loginDisabled: false
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
      this.$store.commit('changeBottomShow', false)
    },
    props: [],
    methods: {
      goBack () {
        this.$store.commit('changeSlideWay', 2)
        this.$router.go(-1)
      },
      goPwLogin () {
        this.$store.commit('changeSlideWay', 1)
        this.$router.push({name: 'pwLogin'})
      },
      getPhoneAuth () {
        if (!/^1[0-9]{10}$/.test(this.obj.pNumber)) {
          this.$store.commit('commitMsg', '请正确填写手机号')
          return false
        } else {
          return true
        }
      },
      getAuth () {
        if (this.disabled) return
        if (!this.getPhoneAuth()) return
        let that = this
        this.disabled = true
        // todo 这里只是和后台对接前的测试
        // this.$store.commit('updateUid', {uid: 12324, pNumber: 17816161616})
        // ajax
        this.count = 30
        let timeCount = setInterval(function () {
          that.count--
          if (that.count < 0) {
            clearInterval(timeCount)
            that.disabled = false
          }
        }, 1000)
      },
      async login () {
        if (this.loginDisabled) return
        if (!this.getPhoneAuth()) return
        this.loginDisabled = true
        let res = await this.$post('loginP', this.obj)
        if (!res) this.loginDisabled = false
        else {
          // 这里做跳转逻辑
          console.log(res)
          this.$store.commit('updateUid', {uid: res.uid, pNumber: this.obj.pNumber})
          this.$router.push({name: 'my'})
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";

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
          flex: 1;
          margin-right: 10px;
          line-height: 40px;
          height: 40px;
          padding: 0 10px;
          border-bottom: 1px solid $bg;
          @media screen and (max-width: 370px) {
            flex: none;
            width: calc(100% - 150px)
          }
        }
        .auth-button {
          flex: 1;
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
          @media screen and (max-width: 370px) {
            flex: none;
            width: 120px;
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
        &.disabled {
          background-color: #bbb;
          cursor: not-allowed;
        }
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
