<template>
  <div class="optional-box">
    <ShareIndex :shareIndexData='shareIndexData'></ShareIndex>
    <OptionalTitle></OptionalTitle>
    <OptionalList :optionalList='optionStockList'></OptionalList>
  </div>
</template>

<script>
  import ShareIndex from '@/components/home/ShareIndex.vue'
  import OptionalTitle from '@/components/optional/OptionalTitle.vue'
  import OptionalList from '@/components/optional/OptionalList.vue'
  import request, { marketIndex, optionStock } from '@/api'
  import { parseData } from '@/utils'
  export default {
    components: {
      ShareIndex,
      OptionalTitle,
      OptionalList
    },
    data () {
      return {
        shareIndexData: {},
        localStockCodes: [],
        optionStockList: []
      }
    },
    mounted () {
      this.getShareIndexData()
    },
    onShow () {
      // 你之前编辑的这次要重新调用接口
      this.localStockCodes = wx.getStorageSync('addedStockCodeArray')
      this.getOptionData()
    },
    methods: {
      async getShareIndexData () {
        const {data} = await request(marketIndex)
        console.log('shareIndex', data)
        this.shareIndexData = data
      },
      async getOptionData () {
        if (this.localStockCodes.length > 0) {
          try {
            const {data} = await request(optionStock, {
              goodsList: this.localStockCodes
            })
            // 需要的值对应的key数组
            const needKeys = ['goodsName', 'goodsCode', 'lastPrice', 'currentPrice', 'rise', 'increase']
            this.optionStockList = parseData(data, 'data', 'field', needKeys)
          } catch (err) {
            console.log('optionStock接口报错', err)
          }
        }
      }
    }
  }
</script>

<style scoped>
.optional-box{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>