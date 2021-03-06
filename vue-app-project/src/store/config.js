import { UPDATE_CONFIG } from '../constants/ActionType'
const state = {
  theme: '',                        // 页面路由入参  页面主题 应该是某些接口的入参
  version: '',                      // 页面路由入参  版本号 应该是某些接口的入参
  htid: '',                         // 页面路由入参  userid 应该是某些接口的入参
  platform: '',                     // 页面路由入参  app类型 应该是某些接口的入参
  account: '',                      // 页面路由入参  未知 应该是某些接口的入参
  titleheight: 0,                   // 页面路由入参  头部高度
  scrollHeight: 0,                  // 当前页面scroll的大小
  liveTabTime: '',                  // 直播接口返回的时间
  tabIsFixed: false,                // 列表与顶部的距离  用来判断tab菜单是否置顶
  updateMarket: false,              // 控制是否更新行情
  updateRefreshLoading: false,      // app控制是否刷新些tab列表
  callBackHome: false,              // 控制是否切换了并重新回到当前页面  与changeTheem绑定
  scrollToStartPosition: false,     // tab切换时||刷新数据时激动到开始的位置
  isRefreshHomeApi: false           // 是否刷新首页接口
}

const mutations = {
  [UPDATE_CONFIG] (state, payload) {
    state = { ...state, ...payload }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters: {}
}
