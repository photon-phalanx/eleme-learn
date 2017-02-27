<template>
  <div class="star" :class="starType">
    <span v-for="item in items" :class="item" :key="item" class="star-item"></span>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";
  .star {
    font-size: 0;
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        &.on {
          @include bg-image('star48_on');
        }
        &.half {
          @include bg-image('star48_half');
        }
        &.off {
          @include bg-image('star48_off');
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        display: inline-block;
        &.on {
          @include bg-image('star36_on');
        }
        &.half {
          @include bg-image('star36_half');
        }
        &.off {
          @include bg-image('star36_off');
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        &.on {
          @include bg-image('star24_on');
        }
        &.half {
          @include bg-image('star24_half');
        }
        &.off {
          @include bg-image('star24_off');
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .star-item {
      display: inline-block;
      background-size: cover;
    }
  }
</style>
<script type="text/ecmascript-6">
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default{
    data () {
      return {}
    },
    props: ['size', 'score', 'len'],
    methods: {},
    computed: {
      starType () {
        return 'star-' + this.size
      },
      items () {
        let arr = []
        let score = Math.floor(this.score * 2)
        let decimal = score % 2 // 有没有半颗星
        let integer = Math.floor(score / 2)
        for (let i = 0; i < integer; i++) {
          arr.push(CLS_ON)
        }
        if (decimal) {
          arr.push(CLS_HALF)
        }
        for (let i = 0; i < this.len - decimal - integer; i++) {
          arr.push(CLS_OFF)
        }
        return arr
      }
    }
  }
</script>
