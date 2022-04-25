import {featureAPI} from '../../api';


export default {
  async fetchFeatures({commit, rootGetters}) {
    commit(
        'setFeatures',
        await featureAPI.getFeatures(rootGetters['user/getToken']),
    );
  },

  async createFeature({commit, rootGetters}, featureData) {
    commit(
        'pushFeature',
        await featureAPI.createFeature(
            featureData,
            rootGetters['user/getToken'],
        ),
    );
  },

  async deleteFeature({commit, rootGetters}, id) {
    await featureAPI.deleteFeature(id, rootGetters['user/getToken']);
    commit('removeFeature', id);
  },
};
