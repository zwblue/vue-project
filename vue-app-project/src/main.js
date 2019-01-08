import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
// lib-flex
import 'lib-flexible'
// swiper
import 'swiper/dist/css/swiper.min.css'
import './styles/common.scss'
import './styles/theme.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
