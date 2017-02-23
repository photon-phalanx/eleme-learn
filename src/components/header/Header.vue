<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="pic" :style="{backgroundImage: 'url('+seller.avatar+')'}">
      </div>
      <div class="content">
        <div class="title">
          <i class="brand"></i>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliverTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <i class="icon"></i>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin">

    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/mixin.scss";
  .header {
    color: #ffffff;
    background-color: #000000;
    .content-wrapper {
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
      }
    }
  }

</style>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        t: 'red'
      }
    },
    props: ['seller'],
    components: {}
  }
</script>
