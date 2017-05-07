<template>
  <div class="add-address-wrapper">
    <div class="add-address" v-if="!showDetailFlag">
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
              <div class="tag-wrapper" @click="dealTagChange('sex', 0)" :class="{'active': formObj.sex === 0}">
                <tag title="先生"></tag>
              </div>
              <div class="tag-wrapper" @click="dealTagChange('sex', 1)" :class="{'active': formObj.sex === 1}">
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
            <div class="content-line border-1px" @click="changeDetailFlag()">
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
            <div class="tag-wrapper" :class="{'active': formObj.tag === 0}" @click="dealTagChange('tag', 0)">
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
    <div class="map-detail" v-show="showDetailFlag">
      <header class="header">
        <i class="iconfont icon-fangxiang"></i>
        <span class="city" v-if="getPos">{{getPos.addressComponents.city}}</span>
        <input type="text" v-if="getPos" class="address-search" placeholder="小区/写字楼/学校等">
      </header>
      <div id="map-box">加载中</div>
      <div class="nearby-wrapper" ref="nearbyWrapper">
        <div class="nearby-box">
          <div class="nearby-line border-1px" v-for="rs in nearbyArr" @click="updateCurrentAddress(rs.point)">
            <i class="iconfont icon-dizhi"></i>
            <div class="nearby-right">
              <div class="title">{{rs.title}}</div>
              <div class="address">{{rs.address}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BMap from 'BMap'
  import BScroll from 'better-scroll'
  import {mapGetters} from 'vuex'
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import Tag from '../../components/tag/Tag.vue'
  import {geocoder, getSelectedDetail} from '../../api/map'

  export default {
    data () {
      return {
        showDetailFlag: false,
        nearbyArr: [],
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
      this.$nextTick(() => {
        this.nearbyScroll = new BScroll(this.$refs.nearbyWrapper, {
          click: true
        })
      })
    },
    watch: {
      getPos (val) {
        this.initMap()
      }
    },
    components: {
      EasyHeader,
      Tag
    },
    props: [],
    computed: {
      ...mapGetters([
        'getPos'
      ])
    },
    methods: {
      initMap () {
        let self = this
        this.map = new BMap.Map('map-box')
        if (this.getPos && typeof this.getPos === 'object') {
          this.map.centerAndZoom(this.getPos.point, 18)
          this.map.addEventListener('click', function (e) {
            geocoder(e.point).then(function (rs) {
              self.nearbyArr = rs.surroundingPois
              self.$nextTick(() => {
                self.nearbyScroll.refresh()
              })
            })
          })
        }
      },
      changeDetailFlag () {
        this.showDetailFlag = !this.showDetailFlag
        this.$nextTick(() => {
          this.initMap()
        })
      },
      dealTagChange (key, value) {
        this.formObj[key] = value
      },
      updateCurrentAddress (point) {
        getSelectedDetail(point).then((rs) => {
          console.log(rs)
          this.$store.commit('changePos', rs)
          this.$router.push({name: 'order'})
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .add-address-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $bg;
    input {
      width: 90%;
    }
    .add-address {
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
    .map-detail {
      .header {
        display: flex;
        background-color: $blue;
        line-height: 30px;
        height: 30px;
        color: #fff;
        .icon-fangxiang {
          padding: 0 5px;
          flex: 0 0 30px;
          font-size: 30px;
          height: 30px;
          line-height: 30px;
        }

        .city {
          flex: 0 0 80px;
          width: 150px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .address-search {
          flex: 1;
          margin: 3px 10px 3px 0;
          background-color: #fff;
          border-radius: 5px;
          &::-moz-placeholder {
            text-align: center;
          }
          &:-ms-input-placeholder {
            text-align: center;
          }
          &::-webkit-input-placeholder {
            text-align: center;
          }
        }
      }
      #map-box {
        width: 100%;
        height: 300px;
        margin-bottom: 10px;
      }
      .nearby-wrapper {
        position: fixed;
        top: 340px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        .nearby-box {
          .nearby-line {
            display: flex;
            background-color: #fff;
            padding: 10px 0;
            .icon-dizhi {
              color: #ccc;
              flex: 0 0 20px;
              padding: 0 10px;
              width: 20px;
              font-size: 20px;
              line-height: 1.5;
              height: 1.5em;
            }
            @include border-1px($border);
            .nearby-right {
              .title, .address {
                line-height: 1.5;
                height: 1.5em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .address {
                color: #ccc;
                font-size: 12px;
              }
              .title {
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
</style>
