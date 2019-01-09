import commitType from './actions'
import {
  getTopLineData,
  getZhiDinData
} from '../../api/topLine'
import {
  getStore,
  setStore
} from '../../utils/common'

const actions = {
  async getTopLineList ({ commit, state, rootState }, payload) {
    const htid = rootState.config.htid || 'fsfsdfsdfsfafsa'
    const listData = rootState.list.listData
    const interfaceParams = rootState.list.interfaceParams
    const loadedState = rootState.fetch.topLine
    const { type } = payload
    try {
      if (type === 'init') {
        if (loadedState) return
        commitType.updateLoadedState(commit, { topLine: true })
        if (!getStore('topLineHistory.data')) {
          setStore('topLineHistory.data', [])
        }
        const topLineParams = {
          userID: htid,
          count: 10,
          version: '3.1'
        }
        // 头条
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
        const stickParams = {
          userID: htid,
          lastHashId: '',
          version: '3.1'
        }
        const {
          data: stickData
        } = await getZhiDinData(stickParams)
        // 每次重新刷新头条时都会初始化置顶的数据
        setStore('topLineHistory.stickData', [])
        if (stickData.Status === 200) {
          setStore('topLineHistory.stickData', stickData.TopNews)
        }
        // 合并头条与置顶
        const stockTopList = [...getStore('topLineHistory.data'), ...getStore('topLineHistory.stickData')]
        commitType.updateLoadedState(commit, { topLine: false })
        // 如果之间其他接口返回了，就不执行这个接口返回的任何逻辑
        const whichLoading = rootState.list.interfaceState.whichLoading
        // if (whichLoading !== 'topLine') return
        if (stockTopList.length === 0) {
          commitType.updateDataState(commit, { isNoData: true })
        } else {
          // 取前10条数据
          commitType.updateListData(commit, {
            listData: stockTopList.slice(0, interfaceParams.pageSize)
          })
        }
       
        // 加载完成
        commitType.updateLoadingState(commit, {
          initLoading: false,
          refreshLoading: false
        })
        // 判断是否没有更多的数据了
        if (stockTopList.length <= interfaceParams.pageNum * interfaceParams.pageSize) {
          commitType.updateDataState(commit, { isNoMoreData: true })
        }
        commitType.updateInterfaceParams(commit, { pageNum: interfaceParams.pageNum + 1 })
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
        const whichLoading = rootState.list.interfaceState.whichLoading
        if (whichLoading !== 'topLine') return
        // 合并头条与置顶
        const stockTopList = [...getStore('topLineHistory.data'), ...getStore('topLineHistory.stickData')]
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
          commitType.updateDataState(commit, { isNoMoreData: true })
        }
        // 叠加数据
        commitType.updateListData(commit, {
          listData: [...listData, ...data.data]
        })
        // 加载完成
        commitType.updateLoadedState(commit, {
          loadLoading: false
        })
        commitType.updateInterfaceParams(commit, {
          pageNum: interfaceParams.pageNum + 1
        })
      }
    } catch (error) {
      commitType.updateInterfaceParams(commit, {
        loadLoading: false,
        initLoading: false,
        refreshLoading: false
      })
      commitType.updateInterfaceParams(commit, {
        topLine: false
      })
      commitType.updateInterfaceParams(commit, {
        whichLoadedFail: 'topLine'
      })
    }
  }
}
export default {
  namespaced: true,
  actions,
  getters: {}
}
