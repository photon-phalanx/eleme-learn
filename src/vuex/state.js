/**
 * Created by Photon_palanx on 2017/2/22.
 */
import getters from './getters.js'
import Vue from 'vue'
const store = {
  state: {
    errmsg: '',
    dropPos: {},
    uid: undefined,
    isLoadingUnfinished: false,
    bottomShow: true, // 用来在home里表示显不显示foot
    slideWay: 'slideRL',
    // 和商家有关的信息
    seller: null,
    goods: null,
    ratings: null
  },
  mutations: {
    commitMsg (state, msg) {
      state.errmsg = msg
    },
    clearMsg (state) {
      state.errmsg = ''
    },
    dropEmit (state, rect) {
      state.dropPos = rect
    },
    updateUid (state, uid) {
      state.uid = uid
    },
    updateAvatar (state, base64) {
      Vue.set(state.uid, 'avatar', base64)
    },
    updateLoadingState (state, flag = false) {
      state.isLoadingUnfinished = flag
    },
    changeBottomShow (state, flag) {
      state.bottomShow = flag
    },
    changeSlideWay (state, way) {
      // 0不滚动, 1从右往左, 2从左往右
      switch (way) {
        case 0 :
          state.slideWay = 'noSlide'
              break
        case 1 :
          state.slideWay = 'slideRL'
          break
        case 2 :
          state.slideWay = 'slideLR'
          break
      }
    },
    updateSeller (state, data) {
      state.seller = data
    },
    updateGoods (state, data) {
      state.goods = data
    },
    updateRatings (state, data) {
      state.ratings = data
    }
  },
  getters
}

export default store
