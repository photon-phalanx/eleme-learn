<template>
  <div class="err" @click.native="closeMsg">
    <div class="msg-left">
      <i class="msg-icon">.</i>
    </div>
    <div class="msg-content">
      <div class="msg">{{msg}}</div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .err {
    position: absolute;
    z-index: 100;
    width: 80%;
    height: 80px;
    line-height: 80px;
    left: 0;
    right: 0;
    margin: 20px auto;
    border: 1px solid #ccc;
    background-color: rgb(0, 130, 240);
    font-size: 0;
    color: #ffffff;
    * {
      font-size: 14px;
    }
    .msg-left {
      display: inline-block;
      width: 20%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.247059);
    }
    .msg-content {
      width: 80%;
      display: inline-block;
      vertical-align: middle;
    }
    .msg {
      padding-left: 5px;
      display: inline-block;
      word-wrap: break-word;
    }
  }
</style>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  let timeOut = null
  export default{
    data () {
      return {
        flag: 0
      }
    },
    props: ['msg'],
    watch: {
      msg (newValue) {
        this.timeOutController()
      }
    },
    methods: {
      ...mapMutations([
        'clearMsg'
      ]),
      closeMsg () {
        clearTimeout(timeOut)
        this.flag = 0
        this.clearMsg()
      },
      timeOutController () {
        let that = this
        clearTimeout(timeOut)
        timeOut = setTimeout(function () {
          that.closeMsg()
        }, 5000)
        this.flag = 1
      }
    },
    mounted () {
      this.timeOutController()
    }
  }
</script>
