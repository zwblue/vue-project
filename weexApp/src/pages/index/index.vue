<template>
  <div class="container">
    <SearchEntry></SearchEntry>
    <BaseMenu></BaseMenu>
    <divider class="divider"></divider>
    <ShareIndex :shareIndexData='shareIndexData'></ShareIndex>
    <NewsLive></NewsLive>
    <NewsList :listData='listData'></NewsList>
    <div class="market-tab"></div>
    <div class="list-title"></div>
    <div class="list-content"></div>
  </div>
</template>

<script>
  import BaseMenu from '@/components/home/BaseMenu.vue'
  import ShareIndex from '@/components/home/ShareIndex.vue'
  import NewsLive from '@/components/home/NewsLive.vue'
  import NewsList from '@/components/home/NewsList.vue'
  import SearchEntry from '@/components/home/SearchEntry.vue'
  import request, { getnews24List, marketIndex } from '@/api'
  export default {
    components: {
      BaseMenu,
      ShareIndex,
      NewsLive,
      NewsList,
      SearchEntry
    },
    data () {
      return {
        listData: {},
        shareIndexData: {}
      }
    },
    mounted () {
      this.getListData()
      this.getShareIndexData()
    },
    methods: {
      async getListData () {
        const {data} = await request(getnews24List,
          {
            pageSize: 20,
            timeStamp: 0,
            direction: 0
          }
        )
        this.listData = data
      },
      async getShareIndexData () {
        const {data} = await request(marketIndex)
        console.log('shareIndex', data)
        this.shareIndexData = data
      }
    }
  }
</script>

<style scoped>
.divider{
  height: 6px;
  display: block;
  width: 100%;
}
</style>