/**
 * Created by Photon_palanx on 2017/2/22.
 */

const getters = {
  getErrMsg: state => {
    return state.errmsg
  },
  getDrop: state => {
    return state.dropPos
  },
  getUid: state => {
    return state.uid
  },
  getLoadingState: state => {
    return state.isLoadingUnfinished
  }
}

export default getters
