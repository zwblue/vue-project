<template>
<div>
  <div class="search-box" @click="onStockSearchEvent">
    <div class="search-button">
      <div class="search-icon"></div>
      <!-- <div class="search-text">请输入股票代码/简拼</div> -->
      <input type="text" @input='changeInputValue' v-model="inputValue" placeholder-class='input-placeholder' class="input-box" focus confirm-type='search' placeholder="请输入股票代码/简拼">
       <div v-show='inputValue' class="del-icon" @click="clearInputValue"></div>
    </div>
  </div>
  <div class="list-box">
      <div class="item-box bot-bd" v-for="(item,index) in searchResultArray" :key="index">
          <div class="lf-area">
            <div class="item-name">{{item.stockName}}</div>
            <div class="item-code">{{item.stockCode}}</div>
          </div>
          <div class="rt-area">
            <div v-show='index === 1'>已添加</div>
            <div v-show='index !== 1' class="add-icon"></div>
          </div>
      </div>
  </div>
</div>
 
</template>

<script>
  import request, { searchStock } from '@/api'
  export default {
    data () {
      return {
        inputValue: '',
        searchLoading: false,
        searchResultArray: []
      }
    },
    methods: {
      clearInputValue () {
        this.inputValue = ''
      },
      async changeInputValue ({target}) {
        console.log('changeInputValue', target.value, this.inputValue)
        if (!this.searchLoading) {
          this.searchLoading = true
          const {data} = await request(searchStock, {
            keyWords: target.value
          })
          this.searchLoading = false
          this.searchResultArray = data
          // {stockCode: "SZ101212", stockName: "国债1212", stockType: "3"}
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