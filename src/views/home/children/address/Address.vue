<template>
  <div class="address">
    <header>
      <easy-header title="收货地址" goBackClass="icon-fangxiang"></easy-header>
    </header>
    <div class="address-wrapper" ref="addressWrapper">
      <div class="address-container">
        <div class="address-line" v-for="msg in addressList">
          <div class="address-content">
            <span class="tag">{{getTag(msg.tag)}}</span>
            <span class="detail-address">{{msg.address}}</span>
          </div>
          <div class="receiver-content">
            <span class="receiver">{{msg.name}}{{getSex(msg.sex)}}</span>
            <span class="phone">{{msg.pNumber}}</span>
          </div>
        </div>
      </div>
    </div>
    <footer @click="goToAddaddress()">
      <i class="iconfont icon-you"></i>
      <span class="addAddress">新增地址</span>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../../../components/easyHeader/EasyHeader.vue'
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        addressList: []
      }
    },
    async mounted () {
      this.$store.commit('updateLoadingState', true)
      this.$store.commit('changeBottomShow', false)
      // ajax
      this.$store.commit('updateLoadingState', false)
      this.$nextTick(() => {
        this.addressScroll = new BScroll(this.$refs.addressWrapper, {
          click: true
        })
      })
    },
    components: {
      EasyHeader
    },
    props: [],
    methods: {
      getTag (tag) {
        switch (tag) {
          case 0:
            return '家'
          case 1:
            return '公司'
          case 2:
            return '学校'
          default:
            return undefined
        }
      },
      getSex (sex) {
        if (sex === 0) return '(先生)'
        else if (sex === 1) return '(女士)'
        else return ''
      },
      goToAddaddress () {
        this.$router.push({name: 'addAddress'})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/color.scss";
  @import "../../../../assets/css/mixin.scss";

  .address {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: $bg;
    .address-wrapper {
      position: fixed;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow: hidden;
      .address-container {
        background-color: #fff;
        .address-line {
          padding: 15px 20px;
          .address-content {
            .tag {
              color: $green;
              font-weight: bold;
              border: 1px solid $green;
              font-size: 12px;
              margin-right: 1px;
              padding: 1px;
              line-height: 22px;
              vertical-align: middle;
            }
            .detail-address {
              font-size: 16px;
              font-weight: bold;
              line-height: 20px;
              word-break: break-all;
            }
          }
          .receiver-content {
            margin-top: 5px;
            .phone, .receiver {
              color: #999;
              margin-right: 10px;
              font-weight: bold;
              font-size: 14px;
            }
          }
        }
      }
    }
    footer {
      position: fixed;
      width: 100%;
      height: 50px;
      line-height: 50px;
      left: 0;
      bottom: 0;
      background-color: #fff;
      text-align: center;
      color: $blue;
    }
  }
</style>
