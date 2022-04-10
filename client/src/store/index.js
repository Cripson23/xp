import Vue from "vue";
import Vuex from "vuex";
import pois from "./pois"
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    pois
  },
});
