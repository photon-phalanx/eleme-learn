<template>
  <i class="icon-self" :class="[supportIcon[typeNum], size]"></i>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";
  .icon-self {
    display: inline-block;
    background-size: cover;
    vertical-align: top;
  }

  .size1 {
    width: 12px;
    height: 12px;
    line-height: 12px;
    margin-right: 4px;
    &.decrease {
      @include bg-image('decrease_1');
    }
    &.discount {
      @include bg-image('discount_1');
    }
    &.guarantee {
      @include bg-image('guarantee_1');
    }
    &.invoice {
      @include bg-image('invoice_1');
    }
    &.special {
      @include bg-image('special_1');
    }
  }

  .size2 {
    width: 16px;
    height: 16px;
    line-height: 16px;
    margin-right: 6px;
    vertical-align: top;
    &.decrease {
      @include bg-image('decrease_2');
    }
    &.discount {
      @include bg-image('discount_2');
    }
    &.guarantee {
      @include bg-image('guarantee_2');
    }
    &.invoice {
      @include bg-image('invoice_2');
    }
    &.special {
      @include bg-image('special_2');
    }
  }

  .size3 {
    width: 12px;
    height: 12px;
    line-height: 12px;
    margin-right: 2px;
    &.decrease {
      @include bg-image('decrease_3');
    }
    &.discount {
      @include bg-image('discount_3');
    }
    &.guarantee {
      @include bg-image('guarantee_3');
    }
    &.invoice {
      @include bg-image('invoice_3');
    }
    &.special {
      @include bg-image('special_3');
    }
  }

  .size4 {
    width: 16px;
    height: 16px;
    line-height: 16px;
    margin-right: 6px;
    &.decrease {
      @include bg-image('decrease_2');
    }
    &.discount {
      @include bg-image('discount_2');
    }
    &.guarantee {
      @include bg-image('guarantee_2');
    }
    &.invoice {
      @include bg-image('invoice_2');
    }
    &.special {
      @include bg-image('special_2');
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        supportIcon: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    computed: {
      size () {
        return 'size' + this.sizeNum
      }
    },
    props: ['typeNum', 'sizeNum'], // sizeNum是后缀的1和2,typeNum是对应supportIcon的
    components: {}
  }
</script>
