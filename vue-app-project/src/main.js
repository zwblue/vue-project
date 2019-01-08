import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
// 接收并执行app的通知函数
import registerNativeMethod from './utils/nativeMethod'
// lib-flex
import 'lib-flexible'
// swiper
import 'swiper/dist/css/swiper.min.css'
import './styles/common.scss'
import './styles/theme.scss'
Vue.config.productionTip = false
registerNativeMethod(store)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
