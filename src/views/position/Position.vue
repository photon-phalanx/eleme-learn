<template>
  <div class="position">
    <header class="header">
      <easy-header goBackClass="icon-iconcha" title="选择收货地址" :advance="advance"
                   @emitAdvanceEvent="dealAdvanceEvent"></easy-header>
      <div class="line">
        <span class="city">{{posResult}}</span>
        <i class="iconfont icon-xia"></i>
        <div class="search-wrapper">
          <input type="text" class="address-search" placeholder="请输入地址"/>
        </div>
      </div>
    </header>
    <div class="current-address">
      {{getAddress}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BMap from 'BMap'
  import {getPosition, geocoder} from '../../api/map.js'
  import EasyHeader from '../../components/easyHeader/EasyHeader.vue'
  import {mapGetters} from 'vuex'
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
        }
      }
    },
    mounted () {
      getPosition(this)
      console.log(BMap)
    },
    computed: {
      ...mapGetters([
        'getPos',
        'getAddress'
      ]),
      posResult () {
        if (this.getPos === null) return '获取中'
        else if (this.getPos === 'fail') return '获取失败'
        else {
          geocoder(this.getPos.point).then(rs => {
            this.$store.commit('changeAddress', rs.address)
          })
          return this.getPos.address.city
        }
      }
    },
    props: [],
    methods: {
      dealAdvanceEvent () {
        console.log('parent know it')
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
          text-overflow: ellipsis;
        }
        .icon-xia {
          flex: 0 0 30px;
          line-height: 40px;
          font-size: 14px;
        }
        .search-wrapper {
          position: relative;
          flex: 1;
          padding: 5px 15px;
          .address-search {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            vertical-align: top;
          }
        }
      }
    }
  }
</style>
