<template>
  <div class="find">
    <easy-header title="发现"></easy-header>
    <div class="top-block">
      <div class="left">
        <div class="title">积分商城</div>
        <div class="description">0元好物在这里！</div>
        <img src="./testPic.jpeg" class="pic"/>
      </div>
      <div class="right">
        <div class="block border-1px">
          <div class="content-wrapper">
            <div class="title red">美味爆料</div>
            <div class="description">订餐米其林送金猴</div>
          </div>
          <i class="middle"></i>
          <img src="./testPic.jpeg" class="pic"/>
        </div>
        <div class="block">
          <div class="content-wrapper">
            <div class="title blue">推荐有奖</div>
            <div class="description">5元现金拿不停</div>
          </div>
          <i class="middle"></i>
          <img src="./testPic.jpeg" class="pic"/>
        </div>
      </div>
    </div>
    <split :height="8"></split>
  </div>

</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../../../components/easyHeader/EasyHeader.vue'
  import Split from '../../../../components/split/Split.vue'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.$store.commit('changeBottomShow', true)
    },
    components: {
      EasyHeader,
      Split
    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";
  .find {
    .top-block {
      display: flex;
      padding: 10px 10px 0 10px;
      .left {
        flex: 1;
        box-sizing: border-box;
        width: 50%;
        border-right: 1px solid $border;
        .title {
          font-size: 18px;
          line-height: 1;
          margin: 23px 0 10px;
          color: #f90;
        }
        .description {
          font-size: 12px;
          line-height: 1;
          color: $deep-grey;
        }
        .pic {
          display: block;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          margin: auto;
        }
      }
      .right {
        flex: 1;
        padding-left: 10px;
        .block {
          position: relative;
          height: 76px;
          &.border-1px {
            @include border-1px($border);
          }
          .content-wrapper {
            display: inline-block;
            line-height: 40px;
            height: 40px;
            vertical-align: middle;
            .title {
              font-size: 18px;
              line-height: 1;
              margin: 5px 0 10px;
              &.red {
                color: #ff5f3e;
              }
              &.blue {
                color: #66ccff;
              }
            }
            .description {
              font-size: 12px;
              line-height: 1;
              color: $deep-grey;
            }
          }
          .middle {
            display: inline-block;
            line-height: 76px;
            height: 76px;
            width: 0;
            vertical-align: middle;
          }
          .pic {
            position: absolute;
            right: 0;
            top: 13px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
