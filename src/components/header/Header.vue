<template>
  <div class="header">
    <div class="background">
      <img :src="seller.avatar"/>
    </div>
    <div class="content-wrapper">
      <div class="pic" :style="{backgroundImage: 'url('+seller.avatar+')'}">
      </div>
      <div class="content">
        <div class="title">
          <i class="brand"></i>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports" @click="toggleDetail">
          <Icon :typeNum="seller.supports[0].type" :sizeNum="1"></Icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="more" v-if="seller.supports">
        <span class="count" @click="toggleDetail">{{seller.supports.length}}个</span>
        <i class="icon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin">
      <i class="pic"></i><span class="text">{{seller.bulletin}}</span>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
      <div class="detail" v-if="isDetailShow">
        <div class="detail-wrapper clearfix">
          <div class="content">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score" :len="5"></Star>
            </div>
            <div class="sub-title-wrapper">
              <SubTitle title="优惠信息"></SubTitle>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <Icon :typeNum="seller.supports[index].type" :sizeNum="2"></Icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="sub-title-wrapper">
              <SubTitle title="商家公告"></SubTitle>
            </div>
            <div class="bulletin">
              <div class="content">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="toggleDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";

  .header {
    position: relative;
    color: #ffffff;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden; //用于解决滤镜超出header部分的阴影问题
    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      filter: blur(10px);  // TODO 滤镜的使用还需要学习~
      -webkit-filter: blur(10px);
      //postcss没有加上filter吗……
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      * {
        font-size: 14px;
      }
      .pic {
        display: inline-block;
        width: 64px;
        height: 64px;
        background-size: cover;
        vertical-align: top;
        border-radius: 2px;
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            @include bg-image('brand');
            background-size: cover;
            vertical-align: top;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          font-size: 12px;
          margin-bottom: 10px;
        }
        .support {
          line-height: 12px;
          .text {
            line-height: 12px;
            font-size: 10px;
          }
        }
      }
      .more {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px 0 12px;
        line-height: 24px;
        height: 24px;
        border-radius: 14px;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          font-size: 10px;
          line-height: 24px;
          vertical-align: bottom;
        }
        .icon {
          margin-left: 2px;
          font-size: 10px;
          line-height: 24px;
        }
      }
    }
    > .bulletin {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      background-color: rgba(7, 17, 27, 0.2);
      .pic {
        display: inline-block;
        width: 22px;
        height: 12px;
        @include bg-image('bulletin');
        background-size: cover;
        vertical-align: middle;
      }
      .text {
        margin: 0 4px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 10px;
      }

    }
    .detail {
      position: fixed;
      z-index: 200;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7, 17, 27, 0.8);
      -webkit-backdrop-filter: blur(10px); //只对ios有效
      &.fade-enter-active, .fade-leave-active {
        transition: all .5s;
      }
      &.fade-enter, &.fade-leave-to {
        background-color: rgba(7, 17, 27, 0);
      }
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        > .content {
          margin-top: 64px;
          padding-bottom: 64px; //padding重要
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
          }
          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .sub-title-wrapper {
            margin: 28px auto 24px;
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .text {
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0;
        //top: -64px;
        //margin: auto;
        clear: both;
        font-size: 32px;
      }
    }
  }

</style>
<script type="text/ecmascript-6">
  import Star from '../star/Star.vue'
  import Icon from '../icon/Icon.vue'
  import SubTitle from '../subTitle/SubTitle.vue'
  export default{
    data () {
      return {
        seller: '',
        isDetailShow: false,
        supportIcon: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    async mounted () {
      this.seller = await this.$get('seller')
    },
    methods: {
      toggleDetail () {
        this.isDetailShow = !this.isDetailShow
      }
    },
    components: {
      Star,
      SubTitle,
      Icon
    }
  }
</script>
