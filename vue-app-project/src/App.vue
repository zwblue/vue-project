<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from './views/Home.vue'
export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
