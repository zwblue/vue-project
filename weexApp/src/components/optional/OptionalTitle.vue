<template>
  <div class="title-box top-bd bot-bd">
    <div>我的自选股</div>
    <div class="edit-box" @click="jumpToEditOptionalPage">
      <div>编辑</div>
      <div class="edit-icon"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      jumpToEditOptionalPage () {
        wx.navigateTo({
          url: `/pages/optionalEdit/main`
        })
      }
    }
  }
</script>

<style scoped>
.title-box{
  display: flex;
  justify-content: space-between;
  padding: 7px 12px; 
  color: #4c81b9;
  background: #152630;
  font-size: 30rpx;
  border-color: #203846;
}
.edit-box{
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.edit-icon{
  margin-left: 5px;
  background: url('../../../static/images/optional/editor.png');
  background-size: 100% 100%;
  width: 32rpx;
  height: 30rpx;
}
</style>