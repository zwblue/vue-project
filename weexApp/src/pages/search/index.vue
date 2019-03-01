<template>
<div>
  <div class="search-box" @click="onStockSearchEvent">
    <div class="search-button">
      <div class="search-icon"></div>
      <!-- <div class="search-text">请输入股票代码/简拼</div> -->
      <input type="text" v-model="inputValue" placeholder-class='input-placeholder' class="input-box" focus confirm-type='search' placeholder="请输入股票代码/简拼">
       <div v-show='inputValue' class="del-icon" @click="clearInputValue"></div>
    </div>
  </div>
  <div class="list-box">
    <div v-if='handledSearchResultArray.length'>
      <div class="item-box bot-bd" v-for="(item,index) in handledSearchResultArray" :key="index">
        <div class="lf-area">
          <div class="item-name">{{item.stockName}}</div>
          <div class="item-code">{{item.stockCode}}</div>
        </div>
        <div class="rt-area">
          <div v-show='item.showBtn'>已添加</div>
          <div v-show='!item.showBtn' class="add-icon" @click="addStockCodeToStorage(item.stockCode)"></div>
        </div>
      </div>
    </div>
    <div v-else>
      没有搜索到相关的股票
    </div>
  </div>
</div>
 
</template>

<script>
  import request, { searchStock } from '@/api'
  export default {
    data () {
      return {
        // input的值
        inputValue: '',
        // 判断正在加载接口，防止重复加载
        searchLoading: false,
        // 当前搜索结果的列表数据
        searchResultArray: [],
        // 缓存保存的已添加的数据
        addedStockCodeArray: wx.getStorageSync('addedStockCodeArray') || []
      }
    },
    computed: {
      // 由于mpvue中不能在html中对数据进行处理，只能先处理好数据再渲染
      handledSearchResultArray () {
        return this.searchResultArray.map((item, index) => {
          return {
            ...item, showBtn: this.addedStockCodeArray.includes(item.stockCode)
          }
        })
      }
    },
    watch: {
      inputValue (newValue, oldValue) {
        this.changeInputValue(newValue)
      }
    },
    methods: {
      // 清除输入内容并清空列表
      clearInputValue () {
        this.inputValue = ''
        this.searchResultArray = []
      },
      // 将选中的code存入缓存中
      addStockCodeToStorage (val) {
        console.log('setsyncStorage', val)
        try {
          const addedStockCodeArray = wx.getStorageSync('addedStockCodeArray') || []
          addedStockCodeArray.push(val)
          this.addedStockCodeArray = addedStockCodeArray
          wx.setStorageSync('addedStockCodeArray', addedStockCodeArray)
        } catch (e) {
          console.log('暂未在storage存储addedStockCodeArray的值')
        }
      },
      // 改变inPutvaule时调用接口
      async changeInputValue (inputValue) {
        console.log('changeInputValue', inputValue, this.inputValue)
        if (!this.searchLoading) {
          this.searchLoading = true
          try {
            const {data} = await request(searchStock, {
              keyWords: inputValue
            })
            this.searchLoading = false
            this.searchResultArray = data
          } catch (error) {
            console.log(error)
            this.searchLoading = false
          }
        }
      }
    }
  }
</script>
<style>
.input-placeholder{
  color: #677282;
}
</style>

<style scoped>
.search-box{
  border-top: 1px solid #000;
  background: #0f1820;
  width: 100%;
  height: 48px;
}
.search-button{
  width: 90%;
  padding: 0 15px;
  height: 32px; 
  margin:8px auto;
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 26rpx;
  color: #d0d0d0;
  background: #19262f;
}

.search-icon{
  width: 30rpx;
  height: 30rpx;
  background:url('../../../static/images/home/search_icon.png');
  background-size: 100% 100%;
  margin-right: 15rpx;
}
.input-box{
  flex:1;
}

.del-icon{
  width: 30rpx;
  height: 30rpx;
  background:url('./icon_clear.png');
  background-size: 100% 100%;
  margin-left: 10rpx;
}

.list-box{

}
.item-box{
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
}
.item-name{
  font-size: 34rpx;
  color: #d0d0d0;
}
.item-code{
  font-size: 26rpx;
  color: #8c99ae
}
.rt-area{
  color: #8c99ae;
  font-size: 30rpx;
}
.add-icon{
  width: 45rpx;
  height: 44rpx;
  background: url('./search_add_zxg.png');
  background-size: 100% 100%;
}

</style>