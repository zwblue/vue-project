<template>
  <div class="edit-box">
    <div class="title bot-bd">
      <div :class="['title' + index, 'title-item']" v-for="(item,index) in titleList" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="list-box">
      <div class="list-item bot-bd" v-for="(item, index) in handledStockCodes" :key="index">
        <div class="remove"></div>
        <div class="desc">
          <div class="stock-name">
            {{item.goodsName}}
          </div>
          <div>
            {{item.goodsCode}}
          </div>
        </div>
        <div class="toTop"></div>
        <div class="move"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import request, { optionStock } from '@/api'
  import { parseData } from '@/utils'
  export default {
    data () {
      return {
        titleList: ['删除', '名称', '置顶', '移动'],
        localStockCodes: wx.getStorageSync('addedStockCodeArray'),
        handledStockCodes: []
      }
    },
    mounted () {
      console.log('localStockCodes', this.localStockCodes)
      this.getOptionData()
    },
    computed: {
    },
    methods: {
      async getOptionData () {
        if (this.localStockCodes.length > 0) {
          try {
            const {data} = await request(optionStock, {
              goodsList: this.localStockCodes
            })
            // 需要的值对应的key数组
            const needKeys = ['goodsName', 'goodsCode']
            this.handledStockCodes = parseData(data, 'data', 'field', needKeys)
            console.log(this.handledStockCodes)
          } catch (err) {
            console.log('optionStock接口报错', err)
          }
        }
      }
    }
  }
</script>

<style scoped>
.edit-box{
  font-size: 30rpx;
  color: #8e99ac;
}
.title{
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  border-color:#203846
}
.title1{
  width: 31%;
}
.title-item{
  text-align: center;
}
.list-item{
  border-color:#203846;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
}
.remove{
  width: 44rpx;
  height: 44rpx;
  margin: 0 3.5px;
  background: url('../../../static/images/optional/remove_zxg.png');
  background-size: 100% 100%;
}
.desc{
  width: 31%;
  text-align: center;
}
.toTop{
  width: 44rpx;
  height: 44rpx;
  margin: 0 3.5px;
  background: url('../../../static/images/optional/option_top.png');
  background-size: 100% 100%;
}
.move{
  width: 44rpx;
  height: 44rpx;
  margin: 0 3.5px;
  background: url('../../../static/images/optional/move_icon.png');
  background-size: 100% 100%;
}
.stock-name{
  color: #d0d0d0;
}
</style>