/**
 * Created by Photon_palanx on 2017/2/22.
 */
import getters from './getters.js'
const store = {
  state: {
    errmsg: '',
    dropPos: {},
    uid: undefined
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
    }
  },
  getters
}

export default store
