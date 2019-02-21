<template>
  <div class="header">
    <div class="lf-header">
      <div class="logo"></div>
      <div class="name">
        知识存储系统
      </div>
    </div>
    <div class="menu"></div>
    <div class="personal"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      knowLogo: require('../images/know.png')
    }
  }
}
</script>

<style scoped  lang="scss">
.header{
  @include rowflex();
  padding:0 20px;
  height: $layout-header-height;
  background: #fff;
  border-bottom: 1px solid $border-color-base;
  .lf-header{
     @include rowflex();
     .name{
       margin-left: 10px;
     }
  }
  .logo{
    width: 42px;
    height: 42px;
    @include bg('../images/know.png')
  }
}
</style>
