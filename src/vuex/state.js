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
    isLoadingUnfinished: false
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
    }
  },
  getters
}

export default store
