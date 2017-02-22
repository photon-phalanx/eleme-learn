/**
 * Created by Photon_palanx on 2017/2/22.
 */
import getters from './getters.js'
const store = {
  state: {
    errmsg: ''
  },
  mutations: {
    commitMsg (state, msg) {
      state.errmsg = msg
    },
    clearMsg (state) {
      state.errmsg = ''
    }
  },
  getters
}

export default store
