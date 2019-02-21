<template>
  <div class="header">
    <div class="lf-header">
      <div class="logo"></div>
      <div class="name">
        知识存储系统
      </div>
      <Divider type='col'>
      </Divider>
    </div>
    <Input/>
    <div class="menu">
      <div class="menu-item" v-for="item in menuData" :key="item.key">
        {{ item.title }}
      </div>
    </div>
    <div class="personal">
      <div>主题</div>
      <div>登录</div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/input'
import Divider from '@/components/divider'
export default {
  components: {
    Input, Divider
  },
  data () {
    return {
      menuData: [
        { title: 'App组件', key: 'app' },
        { title: 'pc组件', key: 'pc' }
      ]
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
       margin-left: $margin-base;
     }
     .logo{
      width: 42px;
      height: 42px;
      @include bg('../images/know.png')
    }
  }
  .menu{
    @include rowflex();
    .menu-item{
      margin: 0 $margin-base;
      &:hover{
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
  .personal{
    @include rowflex();

  }
}
</style>
