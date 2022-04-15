import {featureAPI} from '../../api';


export default {
  async fetchFeatures({commit}) {
    commit('setFeatures', await featureAPI.getFeatures());
  },

  async createFeature({commit}, featureData) {
    commit('pushFeature', await featureAPI.createFeature(featureData));
  }
};
