<template>
  <div class="news-box top-bd bot-bd" @click="jumpToNewList">
    <div class="lf-area">
      <div class="news-icon"></div>
      {{title}}
    </div>
    <div class="rt-area">
      更多<div class="more-icon"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '小时新闻直播'
      }
    },
    methods: {
      jumpToNewList () {
        wx.navigateTo({
          url: '../newsList/main'
        })
      }
    }
  }
</script>

<style scoped>
.news-box{
  height: 38px;
  background:#111c24;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 10px;  
  color :#6798d3;
  font-size: 30rpx;
}
.lf-area{
  display: flex;
  align-items: center;
}
.news-icon{
  margin-top: 2rpx;
  background:url('../../../static/images/home/news_24.png');
  background-size: 100% 100%;
  width: 45rpx;
  height: 37rpx;
  margin-right: 5px;
}
.rt-area{
  
}
.more-icon{
  display:inline-block;
  width:6px;
  height:6px;
  border-top:4rpx solid #6798d3;
  border-right:4rpx solid #6798d3;
  transform:rotate(45deg);
  margin-left:3px;
  vertical-align:1px;
  margin-right:3px;
}
</style>