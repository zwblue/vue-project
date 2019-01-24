<template>
<div>
  <div>
    <div class="title">
      配置项
    </div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="项目代码">
        <Input v-model="formItem.input"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="项目名称">
        <Input v-model="formItem.input1"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="最新版本号">
        <Input v-model="formItem.input2"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="上个版本号">
        <Input v-model="formItem.input3"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="支持最低版本号">
        <Input v-model="formItem.input4"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="客户端范围">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="安卓"></Checkbox>
          <Checkbox label="IOS"></Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
  </div>
  <div>
     <div class="title">
      全量包
    </div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="目录:">
         <Input v-model="formItem.input5"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="URL:">
         <Input v-model="formItem.input6"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="上传:">
         <Input v-model="formItem.input7"  placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
     <div class="title">
      增量包
    </div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="目录:">
         <Input v-model="formItem.input5"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="URL:">
         <Input v-model="formItem.input6"  placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="上传:">
        <Input v-model="formItem.input7"  placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
  </div>
  </div>
</template>

<script>
  import {
    Form,
    FormItem,
    CheckboxGroup,
    Checkbox,
    Row,
    Col,
    Select,
    Option,
    Input
  } from 'iview'
  export default {
    components: {
      Form,
      FormItem,
      CheckboxGroup,
      Checkbox,
      Row,
      Col,
      Select,
      Option,
      Input
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
</style>

<style scoped>
  .title {
    color: #999;
    font-size: 13px;
    margin: 15px 0;
  }
</style>