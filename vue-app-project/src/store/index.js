
import Vue from 'vue'
import Vuex from 'vuex'

import native from './native'
import fetch from './fetch'
import config from './config'
import list from './list'
import tab from './tab'
import topLine from './tab/topLine'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    native, fetch, config, list, tab, topLine
  }
})
