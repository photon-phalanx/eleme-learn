<template>
  <div class="rating-select">
    <div class="rating-type">
      <div @click="select(2, $event)" class="block positive" :class="{active: selectType === 2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span></div>
      <div @click="select(0, $event)" class="block positive" :class="{active: selectType === 0}">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </div>
      <div @click="select(1, $event)" class="block negative" :class="{active: selectType === 1}">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </div>
    </div>
    <div @click="toggleContent" class="switch" :class="{on:onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin";

  .rating-select {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        line-height: 16px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        &.active {
          color: #fff;
        }
        &.positive {
          background-color: rgba(0, 160, 220, 0.2);
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        &.negative {
          background-color: rgba(77, 85, 93, 0.2);
          &.active {
            background-color: rgb(77, 85, 93);
          }
        }
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default{
    data () {
      return {}
    },
    components: {},
    props: {
      ratings: {
        type: Array
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('select', type)
      },
      toggleContent () {
        if (!event._constructed) {
          return
        }
        this.$emit('toggleContent')
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>
