<template>
  <div class="container">
    <easy-header goBackClass="icon-fangxiang" title="密码登录"></easy-header>
    <div class="main">
      <input type="text" class="telephone" v-model="obj.uname" placeholder="手机/邮箱/用户名"/>
      <input type="password" class="password" v-model="obj.password" placeholder="密码"/>
    </div>
    <div class="button-wrapper">
      <button class="login-button" @click="login"  :disabled="disabled" :class="{disabled:disabled}">登录</button>
    </div>
    <div class="forget-pw-wrapper">
      <a class="forget-pw">忘记密码？</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../../../components/easyHeader/EasyHeader.vue'

  export default {
    data () {
      return {
        obj: {
          uname: '',
          password: ''
        },
        disabled: false
      }
    },
    mounted () {
      this.$store.commit('changeBottomShow', false)
    },
    components: {
      EasyHeader
    },
    props: [],
    methods: {
      async login () {
        if (this.disabled) return
        if (!this.obj.uname || !this.obj.password) {
          this.$store.commit('commitMsg', '请填写完整')
          return
        }
        let res = await this.$post('loginU', this.obj)
        if (res) this.$router.push('{name: my}')
        else {
          this.disabled = false
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
    .main {
      background-color: #fff;
      margin-top: 10px;
      .telephone {
        width: 100%;
        margin-right: 15px;
        line-height: 40px;
        height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid $bg;
      }
      .password {
        width: 100%;
        line-height: 40px;
        height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid $bg;
      }
    }
    .button-wrapper {
      .login-button {
        display: block;
        width: 90%;
        margin: 15px auto;
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
    .forget-pw-wrapper {
      width: 90%;
      margin: 0 auto;
      .forget-pw {
        color: $blue;
        float: right;
      }
    }
  }
</style>
