<template>
  <div class="option-list-page">
    <div class="title-box bot-bd">
      <div v-for="(item,index)  in titleItems" :class="'area' + index" :key="index" @click="setSort(index)">
        {{ item.name }}{{ item.sort ? item.sort === 'up' ? '↑' : '↓' : '' }}
      </div>
    </div>
    <div class="list-box">
      <div class="item-box bot-bd" v-for="(item,index) in handleOptionalList" :key="index">
        <div class="item-desc area0">
          <div class="name">
            {{item.goodsName}}
          </div>
          <div class="code">
            {{item.goodsCode}}
          </div>
        </div>
        <div :class="{'item-price': true, 'area1': true, red: item.rise >= 0, green: item.rise < 0, gray: item.isGray}">{{item.currentPrice}}</div>
        <div :class="{'item-rise': true, 'area2': true, red: item.rise >= 0, green: item.rise < 0, gray: item.isGray}">{{item.rise}}</div>
        <div :class="{'item-increase':true, 'area3': true, 'red-bg': item.increase >= 0, 'green-bg': item.increase < 0, 'gray-bg': item.isGray}">{{item.increase + '%'}}</div>
      </div>
    </div>
    <div class="add-optiona bot-bd" @click="jumpToPage">
        <div class="add-icon"></div>
    </div>
  </div>
</template>

<script>
  // const needKeys = ['goodsName', 'goodsCode', 'currentPrice', 'rise', 'increase']
  export default {
    props: {
      optionalList: {
        type: Array,
        default: []
      }
    },
    computed: {
      handleOptionalList () {
        // 若当前价格为0 则显示lastPrice
        const newOptionalList = this.optionalList.map((item) => {
          if (parseInt(item.currentPrice) === 0) {
            return {
              ...item, currentPrice: item.lastPrice, rise: '0.0', increase: '0.00', isGray: true
            }
          } else {
            return item
          }
        })
        // 根据sortIndex有排序来对数据进行排序
        if (this.sortIndex !== -1) {
          const sortType = this.titleItems[this.sortIndex].sort
          const key = this.titleItems[this.sortIndex].key
          if (sortType === 'up') {
            newOptionalList.sort((a, b) => { return a[key] - b[key] })
          } else {
            newOptionalList.sort((a, b) => { return b[key] - a[key] })
          }
        }
        return newOptionalList
      }
    },
    data () {
      return {
        titleItems: [
          { name: '名称', sort: '', key: 'goodsName' },
          { name: '最新价', sort: '', key: 'currentPrice' },
          { name: '涨跌', sort: '', key: 'rise' },
          { name: '涨跌幅', sort: '', key: 'increase' }
        ],
        sortIndex: -1
      }
    },
    methods: {
      jumpToPage () {
        wx.navigateTo({
          url: '../search/main'
        })
      },
      setSort (index) {
        // 设定能排序的title下标 ，不能设置的不执行该方法
        const canSetSortArrary = [1, 3]
        if (!canSetSortArrary.includes(index)) { return }
        // 设置若反复点击则设他的反排序
        if (this.sortIndex === index) {
          const sortType = this.titleItems[index].sort === 'up' ? 'down' : 'up'
          this.titleItems[index].sort = sortType
        } else {
          this.titleItems[index].sort = 'up'
        }
        this.sortIndex = index
        // 将其他的sort初始化 each不行
        this.titleItems = this.titleItems.map((element, index) => {
          if (this.sortIndex !== index) {
            return {
              ...element, sort: ''
            }
          } else {
            return element
          }
        })
      }
    }
  }
</script>

<style scoped>
.title-box{
  display: flex;
  color: #8c99ae;
  padding:  7px 15px;
  font-size: 30rpx;
  justify-content: space-between;
}
.item-increase {
  color: #d0d0d0;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 5px;
}
.item-box{
  display: flex;
  padding: 7px 15px;
  font-size: 34rpx;
  justify-content: space-between;
  align-items: center;
}
.code{
  color: #8c99ae;
  font-size: 26rpx;
}
.area0 {
  text-align: left;
  width: 31%;
}
.area1 {
  text-align: center;
  width: 23%;
}
.area2 {
  text-align: center;
  width: 23%;
}
.area3 {
  text-align: center;
  width: 23%;
}

.add-optiona{
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
.add-icon{
  width: 136rpx;
  height: 24rpx;
  background: url('../../../static/images/optional/option_add.png') no-repeat;
  background-size: 100% 100%;
}
</style>