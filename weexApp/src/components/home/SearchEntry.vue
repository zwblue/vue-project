<template>
  <div class="search-box" @click="onStockSearchEvent">
    <div class="search-button">
      <div class="search-icon"></div>
      <div class="search-text">请输入股票代码/简拼</div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      onStockSearchEvent () {
        wx.navigateTo({
          url: '../search/main'
        })
      }
    }
  }
</script>

<style scoped>
.search-box{
  border-top: 1px solid #000;
  background: #0f1820;
  width: 100%;
  height: 48px;
}
.search-button{
  width: 90%;
  height: 32px; 
  margin:8px auto;
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  color: #677282;
  background: #19262f;
}

.search-icon{
  width: 26rpx;
  height: 26rpx;
  background:url('../../../static/images/home/search_icon.png');
  background-size: 100% 100%;
  margin-right: 10rpx;
}
</style>