<template>
  <div class="position">
    <header class="header">
      <easy-header goBackClass="icon-iconcha" title="选择收货地址" :advance="advance"
                   @emitAdvanceEvent="dealAdvanceEvent"></easy-header>
      <div class="line">
        <span class="city" v-show="showFlag === 0">{{posResult}}</span>
        <i class="iconfont icon-xia" v-show="showFlag === 0"></i>
        <div class="search-wrapper">
          <input type="text" class="address-search" placeholder="请输入地址" v-model="searchText" @input="doSearch" @focus="searchFocus"/>
          <div class="cancel" v-show="showFlag !== 0" @click="cancelClick">取消</div>
        </div>
      </div>
    </header>
    <div class="bs-common-wrapper" ref="commonWrapper" :class="{active: showFlag === 0}">
      <div class="common-container" v-show="showFlag === 0">
        <div v-if="getPos && getPos !== 'pending'" class="current-address">
          <div class="line-title">当前地址</div>
          <div class="content-wrapper">
            <div class="line-content">
              <div class="address">{{getPos.address}}</div>
              <div class="icon-box">
                <i class="iconfont icon-fangdajing"></i>
                <span class="text" @click="getCurrentPosition">重新定位</span>
              </div>
            </div>
          </div>
        </div>
        <div class="receiving-address" v-if="receivingAddress.length > 0">
          <div class="line-title">收货地址</div>
          <div class="content-wrapper">
            <div class="line-content">
            </div>
          </div>
        </div>
        <div class="nearby-address">
          <div class="line-title">附近地址</div>
          <div class="content-wrapper">
            <div class="line-content border-1px" v-for="(nearbyAddress, index) in nearbyArr" @click="updateCurrentAddress(nearbyAddress.point)">
              {{nearbyAddress.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bs-local-wrapper" ref="localWrapper" :class="{active: showFlag === 1}">
      <div class="local-container" v-show="showFlag === 1">
        <div class="line-title">历史搜索</div>

      </div>
    </div>
    <div class="bs-search-wrapper" ref="searchWrapper" :class="{active: showFlag === 2}">
      <div class="search-container" v-show="showFlag === 2">
        <div class="content-wrapper">
          <div class="line-content" v-for="rs in searchResult">
            <div class="rs-title">{{rs.title}}</div>
            <div class="rs-address">{{rs.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {search, getCurrentPosition, getSelectedDetail} from '../../api/map.js'
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import {mapGetters} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        advance: {
          text: '新增地址',
          style: {
            'flex': '0 0 100px',
            'font-size': '20px',
            'text-align': 'center'
          }
        },
        nearbyArr: [],
        showFlag: 0, // 0是common，1是local，2是search
        searchText: '',
        searchResult: [], // 自动补全的结果
        receivingAddress: []
      }
    },
    mounted () {
      this.nearbyArr = this.getPos ? this.getPos.surroundingPois : []
      this.$nextTick(() => {
        this.commonScroll = new BScroll(this.$refs.commonWrapper, {
          click: true
        })
        this.localScroll = new BScroll(this.$refs.localWrapper, {
          click: true
        })
        this.searchScroll = new BScroll(this.$refs.searchWrapper, {
          click: true
        })
      })
    },
    computed: {
      ...mapGetters([
        'getPos'
      ]),
      posResult () {
        if (this.getPos === null || this.getPos === 'pending') return '获取中'
        else if (this.getPos === 'fail') return '获取失败'
        else {
          return this.getPos.city || this.getPos.addressComponents.city
        }
      }
    },
    props: [],
    methods: {
      getCurrentPosition () {
        getCurrentPosition.call(this)
      },
      searchFocus () {
        this.showFlag = 1
      },
      doSearch () {
        this.showFlag = 2
        this.searchResult = []
        if (this.searchText !== '' && (typeof this.getPos) === 'object') {
          search(this.searchText, this.getPos.addressComponents.city).then((rs) => {
            this.searchResult = rs.ur
            this.$nextTick(() => {
              this.searchScroll.refresh()
            })
          })
        }
      },
      cancelClick () {
        this.searchText = ''
        this.searchResult = []
        this.showFlag = 0
      },
      dealAdvanceEvent () {
        this.$router.push({name: 'addAddress'})
      },
      updateCurrentAddress (point) {
        getSelectedDetail(point).then((rs) => {
          console.log(rs)
          this.$store.commit('changePos', rs)
          this.$router.push({name: 'order'})
        })
      }
    },
    watch: {
      getPos (val, oldVal) {
        if (typeof val === 'object') {
          this.nearbyArr = this.getPos.surroundingPois
          this.$nextTick(() => {
            this.commonScroll.refresh()
          })
        }
      }
    },
    components: {
      EasyHeader
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  @import "../../assets/css/mixin.scss";

  .position {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $bg;
    color: #666;
    .header {
      background-color: $blue;
      .line {
        display: flex;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        .city {
          flex: 0 0 80px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .icon-xia {
          flex: 0 0 30px;
          line-height: 40px;
          font-size: 14px;
        }
        .search-wrapper {
          position: relative;
          display: flex;
          flex: 1;
          padding: 5px 15px;
          .address-search {
            flex: 1;
            width: 100%;
            border-radius: 5px;
            vertical-align: top;
            color: #666;
            background-color: #fff;
            margin-right: 10px;
            &::-webkit-input-placeholder {
              color: #666;
            }
            &:-ms-input-placeholder {
              color: #666;
            }
            &::-moz-placeholder {
              color: #666;
            }
          }
          .cancel {
            flex: 0 0 50px;
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
    .line-title {
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      padding: 0 20px;
      background-color: $bg;
    }
    .content-wrapper {
      padding: 0 20px;
      background-color: #fff;
      .line-content {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        @include border-1px($bg);
      }
    }

    // 这些是为了better-scroll准备的wrapper
    .bs-common-wrapper,.bs-local-wrapper,.bs-search-wrapper {
      position: absolute;
      top: 80px;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      overflow: hidden;
      &.active {
        z-index: 0;
      }
    }

    // 以下是独立样式
    .common-container {
      .current-address {
        .line-content {
          display: flex;
          .address {
            flex: 1;
            line-height: 50px;
            height: 50px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .icon-box {
            flex: 0 0 80px;
            line-height: 50px;
            height: 50px;
            color: $blue;
          }
        }
      }
    }
    .search-container {
      .line-content {
        height: auto;
        padding: 10px 0;
        .rs-title,.rs-address {
          font-size: 14px;
          line-height: 1.5;
          height: 1.5em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
