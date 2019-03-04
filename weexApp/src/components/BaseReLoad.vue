<template>
  <div class="reload-box" :style='{color}' @click="handleReloadEvent">
    {{tip}}
  </div>
</template>

<script>
  export default {
    props: {
      tip: {
        type: String,
        default: '数据加载失败，请重新加载'
      },
      color: {
        type: String,
        default: '#d0d0d0'
      }
    },
    methods: {
      handleReloadEvent () {
        console.log('reloadEvent')
        this.$emit('reloadEvent')
      }
    }
  }
</script>

<style scoped>
.reload-box{
  padding: 20px 0;
  color: #d0d0d0;
  text-align: center;
  font-size: 30rpx;
}
</style>