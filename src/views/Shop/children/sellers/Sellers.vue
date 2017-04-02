<template>
  <div class="sellers" ref="sellers">
    <div class="seller-content">
      <div class="overview">
        <span class="title">{{seller.name}}</span>
        <div class="desc border-1px">
          <star :size="36" :len="5" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <span class="title">起送价</span>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <span class="title">商家配送</span>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <span class="title">平均配送时间</span>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <i class="icon-favorite" :class="{active: favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <span class="title">公告与活动</span>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <Icon :typeNum="item.type" :sizeNum="4"></Icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <span class="title">商家实景</span>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120px" height="90px"/>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <span class="title border-1px">商家信息</span>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScoll from 'better-scroll'
  import Star from '../../../../components/star/Star.vue'
  import Split from '../../../../components/split/Split.vue'
  import RatingSelect from '../../../../components/ratingSelect/RatingSelect.vue'
  import Icon from '../../../../components/icon/Icon.vue'
  import {formatDate} from '../../../../api/date'
  import {parseUrl} from '../../../../api/utils'
  import {sellerSaveToLocal, sellerLoadFromLocal} from '../../../../api/store'

  export default{
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = parseUrl()
            return queryParam.id
          })()
        },
        favorite: undefined
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    filters: {
      formatDate (rateTime) {
        return formatDate(new Date(rateTime), 'YYYY-MM-DD hh:mm')
      }
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        } else {
          this.favorite = !this.favorite
          sellerSaveToLocal(this.seller.id, 'favorite', this.favorite)
        }
      }
    },
    async mounted () {
      this.favorite = sellerLoadFromLocal(this.seller.id, 'favorite', false)
      let seller = await this.$get('seller?id=' + this.seller.id)
      if (seller) this.seller = Object.assign({}, this.seller, seller)
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px' // 让内层ul足够大，可以滚动
      }

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScoll(this.$refs.sellers, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
        if (!this.picScroll) {
          this.picScroll = new BScoll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picScroll.refresh()
        }
      })
    },
    components: {
      Star,
      Split,
      RatingSelect,
      Icon
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/mixin";
  @import "../../../../assets/css/color";

  .sellers {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .desc {
        padding-bottom: 18px;
        font-size: 0;
        @include border-1px($border);
        .star {
          display: inline-block;
          vertical-align: top;
          margin-top: 8px;
        }
        .text {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          margin-right: 12px;
          margin-top: 8px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid $border;
          &:last-child {
            border: none;
          }
          .title {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: $grey;
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        top: 18px;
        right: 11px;
        width: 50px;
        text-align: center;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d649;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .content-wrapper {
        padding: 0 12px 16px;
        @include border-1px($border);
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          @include border-1px($border);
          font-size: 0;
          &:last-child {
            @include border-none();
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        display: inline-block;
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0;
      .title {
        display: inline-block;
        padding-bottom: 12px;
        line-height: 14px;
        @include border-1px($border);
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        @include border-1px($border);
        color: rgb(7, 17, 27);
        font-size: 12px;
        &:last-child {
          @include border-none();
        }
      }
    }
  }
</style>
