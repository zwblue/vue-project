<template>
  <div class="title-box">
    {{title}}
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .title-box{
    
  }
</style>