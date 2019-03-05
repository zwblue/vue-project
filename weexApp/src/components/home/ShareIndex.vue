<template>
  <div class="share-box">
    <div class="share-item" @click="jumpToPage(item)" v-for="(item, index) in newShareIndexData" :key="index">
      <div :class="{'share-number': true, red: item.increase > 0, green: item.increase < 0}">{{item.currentPrice}}</div>
      <div class="share-content">
        <div class="share-name">{{item.goodsName}}</div>
        <div :class="{'share-change': true, red: item.increase > 0, green: item.increase < 0}">{{item.increase + '%'}}</div>
      </div>
      <div class="line" v-if='index !== newShareIndexData.length-1'>
      </div>
    </div>
  </div>
</template>

<script>
  // 股票指数组件
  import { parseData } from '@/utils'
  export default {
    props: {
      shareIndexData: {
        type: Array,
        default: {}
      }
    },
    computed: {
      newShareIndexData () {
        if ('data' in this.shareIndexData) {
          // 需要的值对应的key数组
          const needKey = ['goodsName', 'goodsCode', 'currentPrice', 'increase', 'rise']
          const ShareIndexData = parseData(this.shareIndexData, 'data', 'field', needKey)
          const newShareIndexData = ShareIndexData.map(element => {
            var obj = {}
            this.dataFormat.forEach((item, index) => {
              if (item === 'goodsName') {
                console.log(element[item].slice(0, 2))
                obj[item] = element[item].slice(0, 2)
              } else {
                obj[item] = element[item]
              }
            })
            return obj
          })
          console.log('newShareIndexData', newShareIndexData)
          return newShareIndexData
        } else {
          return [{
            goodsName: '上证指数',
            goodCode: 'SH000001',
            currentPrice: '--',
            increase: '--',
            rise: '--'
          }, {
            goodsName: '深证成指',
            goodCode: 'SZ39901',
            currentPrice: '--',
            increase: '--',
            rise: '--'
          }, {
            goodsName: '创业板指',
            goodCode: 'SZ39906',
            currentPrice: '--',
            increase: '--',
            rise: '--'
          }]
        }
      }
    },
    data () {
      return {
        dataFormat: ['goodsName', 'goodsCode', 'currentPrice', 'increase', 'rise']
      }
    },
    methods: {
      jumpToPage (item) {
        const goodsName = item.goodsName
        const goodsCode = item.goodsCode
        wx.navigateTo({
          url: `../stock/main?name=${goodsName}&code=${goodsCode}`
        })
      }
    }
  }
</script>

<style scoped>
  .share-box{
    width: 100%;
    background: #111c24;
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
  .share-item{
    width: 33.33333%;
    box-sizing: border-box;
    display: flex; 
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .line{
    position: absolute;  
    height: 60%;
    border-right: 3rpx solid #203846;
    right: 0;
  }
  .share-number{
    font-size: 40rpx;
    font-weight: bold;
  }
  .share-content{
    display: flex; 
  }
  .share-name{
    margin-right: 7px;
  }
  .share-change{
    font-size: 28rpx;
  }
</style>