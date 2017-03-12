<template>
  <div class="cart-control">
    <transition name="move">
      <i class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart($event)"></i>
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
      color: rgb(0, 160, 220);
      font-size: 24px;
      line-height: 24px;

      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3D(24px, 0, 0) rotate(180deg); // 3d是为了加速，是我我会用相对定位
      }
      &.move-enter-to, &.move-leave {
        opacity: 1;
        transform: translate3D(0, 0, 0) rotate(0deg);
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
        } else if (this.food.count === 0) { // 非常重要，否则在过渡过程中多次点击的话，会出现负的情况
          return
        }
        this.$emit('decrease')
      }
    },
    props: ['food'],
    components: {}
  }
</script>
