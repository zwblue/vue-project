import { UPDATE_CONFIG } from '../../constants/ActionType'
import commitType from './actions'
console.log(111, commitType)
const state = {
  lastHashId: ''
}

const mutations = {
  [UPDATE_CONFIG] (state, payload) {
    state = { ...state, ...payload }
  }
}
const actions = {
  async getTopLineList ({ commit, state, rootState }, payload) {
    const htid = rootState.config.htid
    const listData = rootState.list.listData
    const lastHashId = state.lastHashId
    const interfaceParams = rootState.list.interfaceParams
    const loadedState = rootState.fetch.topLine
    const { type } = payload
    commitType.updateLoadedState(commit, { topLine: true })
    // commit(`fetch/${UPDATE_LOADED_STATE}`, { topLine: true }, { root: true })
    try {
      if (type === 'init') {
        if (loadedState) return
        commit(updateLoadedState({
          topLine: true
        }))
        // 缓存没有时，也要将其设为空数组
        if (!getStore('topLineHistory.data')) {
          setStore('topLineHistory.data', [])
        }
        // 头条入参
        const topLineParams = {
          userID: htid,
          count: 10,
          version: '3.1',
        }
        const {
          data
        } = await getTopLineData(topLineParams)
        // 头条的接口逻辑
        let historyArray = []
        if (data && (data instanceof Array)) {
          const historyData = getStore('topLineHistory.data') || [] // 缓存的数据
          historyArray = [...data, ...historyData]
          // 缓存至多存200条
          if (historyArray.length >= 200) {
            historyArray = historyArray.slice(0, 201)
          }
          setStore('topLineHistory.data', historyArray)
        }
         
        // 置顶接口
        // 入参
        const stickParams = {
          userID: htid,
          lastHashId: lastHashId,
          version: '3.1'
        }
        const {
          data: stickData
        } = await getZhiDinData(stickParams)
        // 每次重新刷新头条时都会初始化置顶的数据
        setStore('topLineHistory.stickData', [])
        if (stickData.Status === 200) {
          setStore('topLineHistory.stickData', stickData.TopNews)
          // stockParams = {
          //   ...stockParams, ...{
          //     lastHashId: stickData.HashId
          //   }
          // }
        }
        // 合并头条与置顶
        const topList = getStore('topLineHistory.data')
        const stockList = getStore('topLineHistory.stickData')
        const stockTopList = [...stockList, ...topList]
        dispatch(updateLoadedState({
          topLine: false
        }))
        // 如果之间其他接口返回了，就不执行这个接口返回的任何逻辑
        const whichLoading = getState().list.interfaceState.whichLoading
        if (whichLoading !== 'topLine') return

        // 缓存头条加上置顶的都没有数据就为空
        if (stockTopList.length === 0) {
          dispatch(updateDataState({
            isNoData: true
          }))
        } else {
          // 取前10条数据
          dispatch(updateListData({
            listData: stockTopList.slice(0, interfaceParams.pageSize)
          }))
        }
       
        // 加载完成
        dispatch(updateLoadingState({
          initLoading: false,
          refreshLoading: false
        }))
        // 判断是否没有更多的数据了
        if (stockTopList.length <= interfaceParams.pageNum * interfaceParams.pageSize) {
          dispatch(updateDataState({
            isNoMoreData: true
          }))
        }
        dispatch(updateInterfaceParams({
          pageNum: interfaceParams.pageNum + 1
        }))
      } else {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 200)
        })
        const params = {
          pageNum: interfaceParams.pageNum,
          pageSize: interfaceParams.pageSize
        }
        // 如果之间其他接口返回了，就不执行这个接口返回的任何逻辑
        const whichLoading = getState().list.interfaceState.whichLoading
        if (whichLoading !== 'topLine') return
        // 合并头条与置顶
        const topList = getStore('topLineHistory.data')
        const stockList = getStore('topLineHistory.stickData')
        const stockTopList = [...stockList, ...topList]
        const returnData = stockTopList.slice(params.pageNum * params.pageSize, (params.pageNum + 1) * params.pageSize) // 缓存的数据
        const {
          data
        } = {
          data: {
            data: returnData,
            TotalCount: stockTopList.length
          }
        }
        // 判断是否没有更多的数据了
        if (stockTopList.length <= interfaceParams.pageNum * interfaceParams.pageSize) {
          dispatch(updateDataState({
            isNoMoreData: true
          }))
        }
        // 叠加数据
        dispatch(updateListData({
          listData: [...listData, ...data.data]
        }))

        // 加载完成
        dispatch(updateLoadingState({
          loadLoading: false,
        }))
        console.log(interfaceParams.pageNum)
        dispatch(updateInterfaceParams({
          pageNum: interfaceParams.pageNum + 1
        }))
      }
    } catch (error) {
      dispatch(updateLoadingState({
        loadLoading: false,
        initLoading: false,
        refreshLoading: false
      }))
      dispatch(updateLoadedState({
        topLine: false
      }))
      dispatch(updateInterfaceState({
        whichLoadedFail: 'topLine'
      }))
     
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {}
}
