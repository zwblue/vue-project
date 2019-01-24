<template>
  <div id="app">
    <Home v-if='isLogin'></Home>
    <Login v-if='!isLogin' @updateIsLogin='updateIsLogin'></Login>
  </div>
</template>

<script>
import Home from './views/Home'
import Login from './views/Login'
export default {
  name: 'app',
  components: {
    Home, Login
  },
  data() {
    return {
      isLogin: sessionStorage.getItem('isLogin')
    }
  },
  methods: {
    updateIsLogin(isLogin) {
      this.isLogin = isLogin
    }
  },
}
</script>

<style>
#app {
}
</style>
