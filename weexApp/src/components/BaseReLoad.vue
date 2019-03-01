<template>
  <div class="reload-box" @click="handleReloadEvent">
    {{tip}}
  </div>
</template>

<script>
  export default {
    props: {
      tip: {
        type: String,
        default: '数据加载失败，请重新加载'
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
  margin-top: 20px;
  color: #d0d0d0;
  text-align: center;
  font-size: 30rpx;
}
</style>