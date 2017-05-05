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
            <input type="text" class="text" placeholder="姓名" v-model="formObj.name"/>
          </div>
          <div class="content-line">
            <div class="tag-wrapper"  @click="dealTagChange('sex', 0)" :class="{'active': formObj.sex === 0}">
              <tag title="先生"></tag>
            </div>
            <div class="tag-wrapper"  @click="dealTagChange('sex', 1)" :class="{'active': formObj.sex === 1}">
              <tag title="女士"></tag>
            </div>
          </div>
        </div>
      </div>
      <div class="tel line border-1px">
        <div class="title">电话</div>
        <div class="content">
         <input type="tel" class="phone" placeholder="收货人电话" v-model="formObj.pNumber"/>
        </div>
      </div>
      <div class="address line border-1px">
        <div class="title">地址</div>
        <div class="content">
          <div class="content-line border-1px">
            <input type="text" class="text" placeholder="小区/写字楼/学校等"/>
            <i class="iconfont icon-you"></i>
          </div>
          <div class="content-line">
            <input type="text" class="text" placeholder="详细地址" v-model="formObj.address"/>
          </div>
        </div>
      </div>
      <div class="tablet line border-1px">
        <div class="title">门牌号</div>
        <div class="content">
          <input type="text" class="text" placeholder="例:5号楼203室" v-model="formObj.tablet"/>
        </div>
      </div>
      <div class="tag-line line border-1px">
        <div class="title">标签</div>
        <div class="content">
          <div class="tag-wrapper" :class="{'active': formObj.tag === 0}" @click="dealTagChange('tag', 0)" >
            <tag title="家"></tag>
          </div>
          <div class="tag-wrapper" :class="{'active': formObj.tag === 1}" @click="dealTagChange('tag', 1)">
            <tag title="公司"></tag>
          </div>
          <div class="tag-wrapper" :class="{'active': formObj.tag === 2}" @click="dealTagChange('tag', 2)">
            <tag title="学校"></tag>
          </div>
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
          sex: -1,
          pNumber: '',
          address: '',
          tablet: ''
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
      dealTagChange (key, value) {
        this.formObj[key] = value
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
    input {
      width: 90%;
    }
    .box {
      background-color: #fff;
      margin-top: 15px;
      .tag-wrapper {
        display: inline-block;
        border: 1px solid $bg;
        border-radius: 5px;
        &.active {
          border: 1px solid $blue;
          border-radius: 5px;
          background-color: #ccffff;
        }
      }
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
          height: 30px;
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
