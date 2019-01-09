import { UPDATE_LOADED_STATE } from '../constants/ActionType'
const state = {
  // false 加载过了完成， true 表示 未加载完成（正在加载中）
  topLine: false,
  cheif: false,
  live: false,
  news: false,
  qus: false,
  event: false,
  notice: false,
  report: false
}
const mutations = {
  [UPDATE_LOADED_STATE] (state, payload) {
    state = { ...state, ...payload }
    console.log(state, payload)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters: {}
}
