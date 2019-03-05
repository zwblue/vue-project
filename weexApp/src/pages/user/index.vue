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
        animationData: null,
        timer: 1500
      }
    },
    mounted () {
    },
    onHide () {
      console.log('重新返回这个页面了')
      this.rotatePoint(0, 0)
    },
    methods: {
      rotatePoint (timer, deg) {
        const animation = wx.createAnimation({
          duration: timer,
          timingFunction: 'ease'
        })
        animation.export()
        animation.rotate(deg).step()
        this.animationData = animation.export()
      },
      jumpToPage () {
        // 旋转动画
        this.rotatePoint(this.timer, 1440)
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/updateLog/main`
          })
          // 小程序中返回时并没有将数据重置，所以手动将其归0，否则将会出现不转的情况
        }, this.timer)
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