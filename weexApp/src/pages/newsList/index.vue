<template>
<div class="list-box">
  <NewsList :listData='listData'></NewsList>
  <BaseLoading :isShow='loadingIsShow'></BaseLoading>
</div>
</template>

<script>
  import NewsList from '@/components/home/NewsList'
  import BaseLoading from '@/components/BaseLoading'
  import request, { getnews24List } from '@/api'
  export default {
    components: {
      NewsList,
      BaseLoading
    },
    data () {
      return {
        listData: {},
        lastTimeStamp: 0,
        loadingIsShow: false
      }
    },
    mounted () {
      this.getListData()
    },
    methods: {
      async getListData (callback) {
        this.loadingIsShow = true
        const {data} = await request(getnews24List,
          {
            pageSize: 10,
            timeStamp: 0,
            direction: 0
          }
        )
        this.listData = data
        const arr = data.Data
        const field = data.Field
        const index = field.findIndex(item => item === 'displaytime')
        this.lastTimeStamp = arr[arr.length - 1][index]
        this.loadingIsShow = false
        callback()
      },
      async loadMoreListData () {
        const {data} = await request(getnews24List,
          {
            pageSize: 10,
            timeStamp: this.lastTimeStamp,
            direction: 1
          }
        )
        this.listData.Data.push(...data.Data)
        this.loadingIsShow = false
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
      if (this.loadingIsShow) return
      this.loadingIsShow = true
      this.loadMoreListData()
    }
  }
</script>

<style scoped>
  .list-box{
    background:#111c24;
  }
</style>