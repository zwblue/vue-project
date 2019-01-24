<template>
  <div class="header">
    <div>
      H5资源管理系统
    </div>
    <div>
      <Dropdown>
        <a href="javascript:void(0)" class="user">
          <Icon class='icon' type="ios-contact" /> 管理员
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>退出登录</DropdownItem>
          <DropdownItem @click.native="updatePassWord">修改密码</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!-- <Icon class='icon' type="ios-contact" />
        admin
        <Icon type="md-log-out" />
        退出 -->
    </div>
    <Modal v-model="passwordModel" :closable="false" title="修改密码">
        <Input placeholder="请输入旧密码" class="password"></Input>
        <Input placeholder="请输入新密码" class="password"></Input>
        <Input placeholder="请确认新密码" class="password"></Input>
    </Modal>
  </div>
</template>

<script>
  import {
    Icon,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Modal,
    Input
  } from 'iview'
  export default {
    components: {
      Icon,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      Modal,
      Input
    },
    data() {
      return {
        passwordModel: false
      }
    },
    methods: {
      updatePassWord() {
        this.passwordModel = true
      }
    },
  }
</script>

<style scoped lang='scss'>
  .password{
    margin: 10px 0;
  }
  .header {
    position: fixed;
    z-index: 99;
    top:0;
    left:0;
    right:0;
    height: 64px;
    line-height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $content;
    padding: 0 40px;
    color: #fff;
    .icon {
      margin-right: 2px;
      font-size: 17px;
      margin-bottom: 2px;
    }
    .user {
      color: #fff;
    }
  }
</style>