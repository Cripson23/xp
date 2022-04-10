import {poiAPI} from '../../api';


export default {
  async getAllPOIs({commit}) {
    commit('setPOIs', await poiAPI.getPOIs());
  },
};
