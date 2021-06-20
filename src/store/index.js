import Vue from 'vue'
import Vuex from 'vuex'
import data from './origin' // Vuex 原始資料
import { getField, updateField } from 'vuex-map-fields'
Vue.use(Vuex)
const newState = JSON.parse(JSON.stringify(data))
export default new Vuex.Store({
  state: newState,
  getters: {
    getField
  },
  mutations: {
    updateField
  },
  actions: {
  },
  modules: {
  }
})
