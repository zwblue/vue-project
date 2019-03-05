<template>
  <div class="user-box">
    <div class="logo-box" @click="jumpToPage">
      <image src='../../../static/images/user/ht_code.png' class="ht-image"></image>
      <div class="logo" :animation="animationData"></div>
    </div>
    <div class="desc">
      <div>下载海通APP，</div>
      <div>查看行情、快速交易，一站式搞定。</div>
      <div>还可在线开户，助您一指擒牛！</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        animation: null,
        animationData: null
      }
    },
    methods: {
      jumpToPage () {
        // 旋转动画
        const timer = 1500
        const animation = wx.createAnimation({
          duration: timer,
          timingFunction: 'ease'
        })
        animation.rotate(1440).step()
        this.animationData = animation.export()

        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/updateLog/main`
          })
        }, timer + 1)
      }
    }
  }
</script>

<style scoped>
.user-box{
  text-align: center;
  padding-top: 20%;
  color: #8c99ae;
  font-size: 34rpx;
  font-weight: bold;
}
.logo-box{
  position: relative;
}
.ht-image{
  width: 351rpx;
  height: 462rpx;
}
.logo{
  position: absolute;
  left: 50%;
  top:-9rpx;
  z-index: 5;
  width: 348rpx;
  height: 348rpx;
  background: url('../../../static/images/user/ht_logo.png');
  background-size: 100% 100%;
  position:absolute;
  margin-left:-162rpx;
}
.desc{
  margin-top: 25px;
  line-height: 60rpx;
}
</style>