<template>
  <div class="err" @click="closeMsg">
    <div class="msg-left">
      <i class="msg-icon">!</i>
    </div>
    <div class="msg-content">
      <div class="msg">{{msg}}</div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .err {
    position: absolute;
    display: flex;
    z-index: 999;
    left: 0;
    right: 0;
    top: 45%;
    margin: 20px auto;
    border: 1px solid #ccc;
    width: 70%;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    background-color: rgb(0, 180, 240);
    color: #fff;
    .msg-left {
      flex: 0 0 20%;
      height: 100%;
      line-height: 80px;
      font-size: 60px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.147059);
    }
    .msg-content {
      flex: 1;
      height: 100%;
      display: table-cell;
      overflow: hidden;
      text-align: center;
      .msg {
        display: inline-block;
        padding: 0 5px;
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        vertical-align: middle;
        word-wrap: break-word;
      }
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
        }, 2000)
        this.flag = 1
      }
    },
    mounted () {
      this.timeOutController()
    }
  }
</script>
