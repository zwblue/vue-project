<template>
<div>
  <div>
    <div class="title">
      配置项
    </div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="项目代码:">
        {{formItem.input}}
      </FormItem>
      <FormItem label="项目名称:">
      {{formItem.input1}}
      </FormItem>
      <FormItem label="最新版本号:">
      {{formItem.input2}}
      </FormItem>
      <FormItem label="上个版本号:">
        {{formItem.input3}}
      </FormItem>
      <FormItem label="支持最低版本号:">
        {{formItem.input4}}
      </FormItem>
      <FormItem label="客户端范围:">
        安卓、IOS
      </FormItem>
    </Form>
  </div>
  <div>
    <div class="title">
      全量包
    </div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="目录:">
        {{formItem.input5}}
      </FormItem>
      <FormItem label="URL:">
      {{formItem.input6}}
      </FormItem>
      <FormItem label="上传:">
      {{formItem.input7}}
      </FormItem>
    </Form>
     <div class="title">
      增量包
    </div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="目录:">
        {{formItem.input5}}
      </FormItem>
      <FormItem label="URL:">
      {{formItem.input6}}
      </FormItem>
      <FormItem label="上传:">
      {{formItem.input7}}
      </FormItem>
    </Form>
  </div>
</div>
 
</template>

<script>
  import {
    Form,
    FormItem,
  } from 'iview'
  export default {
    components: {
      Form,
      FormItem,
    },
    data() {
      return {
        formItem: {
          input: '首页代码更新',
          input1: '首页',
          input2: '11.2.3',
          input3: '11.2.2',
          input4: '10.2.3',
          checkbox: ['安卓'],
          input5: '/assets/resonponse/dist/web/h5/static/index.html',
          input6: 'http:35.32.45.88:5026/stock/app.html',
          input7: '/assets/resonponse/dist/web/h5/static/index.html',
        }
      }
    },
  }
</script>
<style>
  .ivu-checkbox{
    margin: 0 5px;
  }
 #app .ivu-form .ivu-form-item-label,#app .ivu-form .ivu-form-item-content{
   font-size: 14px;
 }
</style>

<style scoped>
  .title {
    color: #999;
    font-size: 13px;
    margin: 15px 0;
  }
</style>