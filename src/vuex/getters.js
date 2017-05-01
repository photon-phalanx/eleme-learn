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
  },
  getBottomShow: state => {
    return state.bottomShow
  },
  getSlideWay: state => {
    return state.slideWay
  },
  getSeller: state => {
    return state.seller
  },
  getGoods: state => {
    return state.goods
  },
  getRatings: state => {
    return state.ratings
  },
  getPos: state => {
    return state.position
  },
  getAddress: state => {
    return state.address
  }
}

export default getters
