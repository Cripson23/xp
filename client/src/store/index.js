import Vue from "vue";
import Vuex from "vuex";
import features from "./features"
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    features
  },
});
