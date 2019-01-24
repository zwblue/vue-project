import Vue from 'vue'
import App from './App.vue'
import 'iview/dist/styles/iview.css';
import './styles/commom.scss';
import { Modal } from 'iview'

Vue.config.productionTip = false
Vue.use(Modal)

new Vue({
  render: h => h(App),
}).$mount('#app')
