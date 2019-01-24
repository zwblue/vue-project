<template>
<div class="login">
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" :size="size" v-model="formInline.user" placeholder="用户名">
      <Icon type="ios-person-outline" :size="size" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" :size="size" v-model="formInline.password" placeholder="密码">
      <Icon type="ios-lock-outline" :size="size" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" :size="size" long @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
  </Form>
</div>
</template>

<script>
  import {
    Button,
    FormItem,
    Form,
    Input,
    Icon
  } from 'iview'
  export default {
    components: {
      Button,
      FormItem,
      Form,
      Input,
      Icon
    },
    data() {
      return {
        size: 'large',
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: '密码不得少于6位',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$emit('updateIsLogin',true)
            sessionStorage.setItem('isLogin', true)
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>
<style scope lang="scss">
  .login{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $title;
  }
</style>
