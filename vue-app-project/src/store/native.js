import { UPDATE_NATIVE_DATA } from '../constants/ActionType'
const state = {
  market: {},                    // 行情
  optionalCode: '',              // 自选股
  optionalTeam: '',              // 自选股
  optionalChange: {              // 个股异动
    tockcode: '',
    signalvalue: '',
    signalname: '',
    stockname: '',
    direction: ''
  }
}
const mutations = {
  [UPDATE_NATIVE_DATA] (state, payload) {
    state = { ...state, ...payload }
  }
}
// const actions = {
//   async GET_LIVE_DATA ({
//     state,
//     commit,
//     rootState
//   }, params) {
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  getters: {}
}
