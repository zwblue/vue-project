<template>
  <div v-if='isShow' class="loading-box">
     <image src="../../static/images/home/default.gif" class="image-box"></image> 加载中...
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
      }
    },
    created () {
      console.log(888, this.imgUrl)
    },
    mounted () {
      console.log(888, this.imgUrl)
    }
  }
</script>
<style scoped>
  .loading-box{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #d0d0d0;
    font-size: 30rpx;
    margin-bottom: 10px;
  }
  .image-box{
    width: 64rpx;
    height: 64rpx;
    margin-right: 3px;
  }
</style>