<template>
  <div class="container" @click.stop.prevent=";" v-show="getLoadingState">
    <!--
        <div class="img-wrapper">
      <img class="img" src="./icon_loading.png" :style="{transform: 'translateY('+ -imgPos * 100+ 'px)'}"/>
      <svg class="ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
      </svg>
    </div>

     .img-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin: 70% auto 0; // margin的百分比按照包含块的宽度计算
      animation: load 1s infinite ease-in-out;
    }
    这样的结构尝试失败了


    -->
    <div class="img" :style="{backgroundPositionY: -imgPos * 100+ 'px'}"></div>
    <svg class="ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
    </svg>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  // const SELF_TIMEOUT = 15
  export default {
    data () {
      return {
        imgPos: 3,
        timeout: null
        // selfCloseTimeout: null 为了防止长时间的等待，规定15秒钟还没得到数据就提示超时好了
      }
    },
    computed: {
      ...mapGetters([
        'getLoadingState'
      ])
    },
    mounted () {
      this.timeout = setInterval(() => {
        this.imgPos = (this.imgPos + 1) % 7
      }, 1000)
      /*
      this.selfCloseTimeout = setTimeout(() => {
      this.$store.commit('commitMsg', '请求超时')
      })
      */
    },
    beforeDestroy () {
      clearInterval(this.timeout)
      // clearTimeout(this.selfCloseTimeout)
    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @keyframes load {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes scaleEllipse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.3);
    }
    100% {
      transform: scale(1);
    }
  }

  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 500;
    .img {
      width: 100px;
      height: 100px;
      margin: 70% auto 0;
      background: url("./icon_loading.png") no-repeat 0 0;
      animation: load 1s infinite ease;
    }
    .ellipse {
      display: block;
      width: 52px;
      height: 20px;
      margin: 30px auto;
      animation: scaleEllipse 1s infinite ease;
    }
  }
</style>
