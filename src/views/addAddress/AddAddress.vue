<template>
  <div class="add-address">
    <header>
      <easy-header title="新增地址" goBackClass="icon-iconcha"></easy-header>
    </header>
    <div class="box">
      <div class="person line border-1px">
        <div class="title">联系人</div>
        <div class="content">
          <div class="content-line border-1px">
            <input type="text" class="text" placeholder="姓名"/>
          </div>
          <div class="content-line">
            <tag class="tag-wrapper" title="先生"></tag>
            <tag class="tag-wrapper" title="女士"></tag>
          </div>
        </div>
      </div>
      <div class="tel line border-1px">
        <div class="title">电话</div>
        <div class="content">
         <input type="tel" class="phone" placeholder="收货人电话"/>
        </div>
      </div>
      <div class="address line border-1px">
        <div class="title">地址</div>
        <div class="content">
          <div class="content-line border-1px">
            <input type="text" class="text" placeholder="小区/写字楼/学校等"/>
          </div>
          <div class="content-line">
            <input type="text" class="text" placeholder="详细地址"/>
          </div>
        </div>
      </div>
      <div class="tel line border-1px">
        <div class="title">门牌号</div>
        <div class="content">
          <input type="text" class="text" placeholder="例:5号楼203室"/>
        </div>
      </div>
      <div class="tag-line line border-1px">
        <div class="title">标签</div>
        <div class="content">
          <tag class="tag-wrapper" :class="{'active': formObj.tag === '家'}" @click="dealTagChange('家')" title="家"></tag>
          <tag class="tag-wrapper" title="公司"></tag>
          <tag class="tag-wrapper" title="学校"></tag>
        </div>
      </div>
    </div>
    <button class="button">确定</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import Tag from '../../components/tag/Tag.vue'
  export default {
    data () {
      return {
        formObj: {
          tag: '',
          name: '',
          nameTag: '',
          tphone: '',
          address: ''
        }
      }
    },
    mounted () {

    },
    components: {
      EasyHeader,
      Tag
    },
    props: [],
    methods: {
      dealTagChange (text) {
        console.log('click')
        this.formObj.tag = text
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .add-address {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $bg;
    .box {
      background-color: #fff;
      margin-top: 15px;
      .line {
        display: flex;
        padding: 10px 0;
        margin: 0 10px;
        font-size: 14px;
        line-height: 40px;
        color: $text;
        @include border-1px($bg);
        .title {
          flex: 0 0 100px;
        }
        .content {
          flex: 1;
          .content-line {
            line-height: 20px;
            height: 20px;
            padding: 10px 0;
            &.border-1px {
              @include border-1px($bg);
            }
            .tag-wrapper {
              margin-right: 5px;
            }
          }
        }
      }

      .tag-line {
        .tag-wrapper {
          line-height: 20px;
          height: 20px;
          &.active {
            border: 1px solid $blue;
            background-color: #ccffff;
          }
        }
      }
    }

    .button {
      display: block;
      margin: 20px auto;
      width: 90%;
      text-align: center;
      line-height: 40px;
      height: 40px;
      background-color: $green;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>
