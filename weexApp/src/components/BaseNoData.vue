<template>
  <div class="no-data" :style='{color}'>
    {{tip}}
  </div>
</template>

<script>
  export default {
    props: {
      tip: {
        type: String,
        default: '没有更多的数据了...'
      },
      color: {
        type: String,
        default: '#d0d0d0'
      }
    }
  }
</script>

<style scoped>
.no-data{
  margin: 15px;
  color: #d0d0d0;
  text-align: center;
  font-size: 30rpx;
}
</style>