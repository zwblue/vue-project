import {
  UPDATE_LOADING_STATE,
  UPDATE_DATA_STATE,
  UPDATE_INTERFACE_STATE,
  UPDATE_LIST_DATA,
  RESET_STATE,
  UPDATE_INTERFACE_PARAMS
} from '../constants/ActionType'
const initialState = {
  loadingState: {
    initLoading: false,           // 初始化loading 针对整个页面
    refreshLoading: false,        // 刷新loading 只针对列表
    loadLoading: false            // 加载Loading 针对加载更多的loading
  },
  dataState: {
    isNoData: false,              // 起初没有数据
    isNoMoreData: false           // 加载更多时没有数据
  },
  interfaceState: {
    whichLoading: '',             // 当前接口加载
    whichLoadedFail: ''           // 接口加载失败
  },
  listData: [],
  interfaceParams: {
    pageSize: 10,
    pageNum: 1,
    pageCount: 0
  }
}
const state = { ...initialState }

const mutations = {
  // 更新loading状态
  [UPDATE_LOADING_STATE] (state, payload) {
    state.loadingState = { ...state.loadingState, ...payload }
  },
  // 更新data状态
  [UPDATE_DATA_STATE] (state, payload) {
    state.dataState = { ...state.dataState, ...payload }
  },
  // 更新接口状态
  [UPDATE_INTERFACE_STATE] (state, payload) {
    state.interfaceState = { ...state.interfaceState, ...payload }
  },
  // 更新接口入参
  [UPDATE_INTERFACE_PARAMS] (state, payload) {
    state.interfaceParams = { ...state.interfaceParams, ...payload }
  },
  // 更新列表数据
  [UPDATE_LIST_DATA] (state, payload) {
    state.listData = payload.listData
  },
  // 重置list状态
  [RESET_STATE] (state) {
    initialState.interfaceState.whichLoading = state.initialState.whichLoading
    state = initialState
    // state.interfaceState.whichLoading = whichLoading
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters: {}
}
