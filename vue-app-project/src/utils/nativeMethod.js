export default (store) => {
  console.log(store)
  return
  window.updateLinster = function(market) {
    if (market) {
      store.commit(updateNativeData({
        market: market.dataRecord
      }))
      store.commit(updatePageConfig({
        updateMarket: !store.getState().pageConfig.updateMarket
      }))
    }
  }
  // 主题
  window.changeTheme = function(theme) {
    store.commit(updatePageConfig({
      callBackHome: !store.getState().pageConfig.callBackHome
    }))
    store.commit(updatePageConfig({
      theme
    }))
    const themeColor = theme === 'night' ? '#202528' : '#FFF'
    document.body.style.backgroundColor = themeColor;
  }
  // 改变url路由
  window.changeUrlParam = function(key, value) {
    store.commit(updatePageConfig({
      [key]: value
    }))
  }
  // 个人股与对应的分组名
  window.getOptional = function(optionalCode, optionalTeam) {
    // alert(optionalCode+optionalTeam)
    store.commit(updateNativeData({
      optionalTeam
    }))
    store.commit(updateNativeData({
      optionalCode
    }))
  }
  // 涨跌异动
  window.updateShortTermElves = function(optionalChange) {
    if (typeof data === 'string') {
      optionalChange = JSON.parse(optionalChange)
    }
    store.commit(updateNativeData({
      optionalChange
    }))
  }
  // 刷新tab资讯
  window.refreshInfo = function() {
    store.commit(updatePageConfig({
      updateRefreshLoading: !store.getState().pageConfig.updateRefreshLoading
    }))
  }
}