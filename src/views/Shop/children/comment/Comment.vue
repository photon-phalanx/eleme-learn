<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select @select="select" @toggleContent="toggleContent" :selectType="selectType" :desc="desc"
                     :onlyContent="onlyContent"
                     :ratings="ratings"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28"/>
            </div>
            <div class="content">
              <span class="name">{{rating.username}}</span>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime |formatDate}}</div>
            </div>
          </li>
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
  import {formatDate} from '../../../../api/date'
  const ALL = 2

  export default{
    data () {
      return {
        seller: {},
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    filters: {
      formatDate (rateTime) {
        return formatDate(new Date(rateTime), 'YYYY-MM-DD hh:mm')
      }
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        } else if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      select (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    async mounted () {
      let [seller, ratings] = await Promise.all([this.$get('seller'), this.$get('ratings')])
      if (seller) this.seller = seller
      if (ratings) this.ratings = ratings
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScoll(this.$refs.ratings, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    components: {
      Star,
      Split,
      RatingSelect
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../assets/css/mixin";
  @import "../../../../assets/css/color";

  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        padding-bottom: 6px;
        border-right: 1px solid $border;
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            margin-bottom: 8px;
            line-height: 12px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        @include border-1px($border);
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          flex: 1;
          position: relative;
          .name {
            line-height: 12px;
            margin-bottom: 4px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .delivery {
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
              color: rgb(0,160,220);
            }
            .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              padding: 0 4px;
              border: 1px solid $border;
              border-radius: 1px;
              color: rgb(147,153,159);
              background-color: #fff;
              font-size: 9px;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right:0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
      }
    }
  }
</style>
