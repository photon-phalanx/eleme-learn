<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart($event)">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{food.count}}</div>
    <i class="cart-increase icon-add_circle" @click="increaseCart($event)"></i>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .cart-control {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3D(24px, 0, 0); // 3d是为了加速，是我我会用相对定位
        .inner {
          transform: rotate(180deg);
        }
      }
      &.move-enter-to,&.move-leave {
        opacity: 1;
        transform: translate3D(0, 0, 0);
        .inner {
          transform: rotate(0deg);
        }
      }

    }
    .count {
      display: inline-block;
      width: 12px;
      padding-top: 6px;
      font-size: 10px;
      line-height: 24px;
      vertical-align: top;
      text-align: center;
      color: rgb(147, 153, 159);
    }
    .cart-increase {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {}
    },
    methods: {
      increaseCart (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('increase')
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('decrease')
      }
    },
    props: ['food'],
    components: {}
  }
</script>
