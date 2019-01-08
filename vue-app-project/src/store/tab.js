import {
  UPDATE_TAB_INDEX
} from '../constants/ActionType'
const state = {
  tabMenuData: {
    homeTabMenuList: [
      '头条',
      '首席',
      '7×24',
      '自选',
      '更多'
    ],
    optionalTabMenuList: [
      '新闻',
      '问董秘',
      '大事',
      '公告',
      '研报'
    ]
  },
  tabIndexData: {
    activeHomeTabIndex: -1,
    activeOptionalTabIndex: -1
  }
}

const mutations = {
  [UPDATE_TAB_INDEX] (state, payload) {
    state = { ...state.tabIndexData, ...payload }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters: {}
}
