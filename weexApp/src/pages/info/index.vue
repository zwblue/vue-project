<template>
<div class="list-box">
  <InfoList :listData='listData'></InfoList>
  <BaseLoading v-if='listState.loading'></BaseLoading>
  <BaseNoData v-if='listState.noData' tip='没有更多的数据了...'></BaseNoData>
  <BaseReload v-if='listState.reLoad' @reloadEvent='getListData' tip='加载失败点击重试'></BaseReload>
</div>
</template>

<script>
  import InfoList from '@/components/info/InfoList'
  import BaseLoading from '@/components/BaseLoading'
  import BaseNoData from '@/components/BaseNoData'
  import BaseReload from '@/components/BaseReload'
  import request, { getStockInfo } from '@/api'
  // 三种状态不能同时出现，所以定个初始状态
  const initListState = {
    loading: false,
    noData: false,
    reLoad: false
  }
  export default {
    components: {
      InfoList,
      BaseLoading,
      BaseNoData,
      BaseReload
    },
    data () {
      return {
        // 列表数据
        listData: [],
        // 列表状态
        listState: {
          loading: false,
          noData: false,
          reLoad: false
        },
        // 接口入参
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    mounted () {
      this.getListData()
    },
    methods: {
      async getListData (callback) {
        wx.showLoading({
          title: '加载中'
        })
        try {
          console.log(this.infoParams)
          const {data} = await request(getStockInfo,
            {
              pageSize: this.page.pageSize,
              pageNum: 1,
              TypeCode: 0
            }
          )
          console.log('infoData', data, this.listState)
          this.listData = data.JsonList
          // 没有更多的数据时
          if (this.page.pageNum * this.page.pageSize >= data.TotalCount) {
            this.listState = {...initListState, noData: true}
          }
          // 页数加1
          wx.hideLoading()
          if (callback) { callback() }
        } catch (error) {
          wx.hideLoading()
          console.log(error)
          this.listState = {...initListState, reLoad: true}
        }
      },
      async loadMoreListData () {
        try {
          this.page.pageNum = this.page.pageNum + 1
          const {data} = await request(getStockInfo,
            {
              pageSize: this.page.pageSize,
              pageNum: this.page.pageNum,
              TypeCode: 0
            }
          )
          this.listData.push(...data.JsonList)
          if (this.page.pageNum * this.page.pageSize >= data.TotalCount) {
            console.log()
            this.listState = {...initListState, noData: true}
          } else {
            this.listState = {...initListState, loading: false}
          }
        } catch (error) {
          this.listState = {...initListState, reLoad: true}
        }
      }
    },
    async onPullDownRefresh () {
      // to doing..
      this.listData = []
      this.getListData(() => { wx.stopPullDownRefresh() })
      // 停止下拉刷新
    },
    // 上拉加载，拉到底部触发
    onReachBottom () {
      // 到这底部在这里需要做什么事情
      if (this.listState.loading || this.listState.noData) return
      this.listState = {...initListState, loading: true}
      this.loadMoreListData()
    }
  }
</script>

<style scoped>
  .list-box{
    background:#111c24;
  }
</style>