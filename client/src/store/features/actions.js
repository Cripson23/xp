import { featureAPI } from "../../api";

export default {
  async fetchFeatures({ commit, rootGetters }) {
    commit(
      "setFeatures",
      await featureAPI.getFeatures(rootGetters["user/getToken"])
    );
  },

  async createFeature({ commit, rootGetters }, featureData) {
    commit(
      "pushFeature",
      await featureAPI.createFeature(featureData, rootGetters["user/getToken"])
    );
  },

  async deleteFeature({ commit, rootGetters }, id) {
    await featureAPI.deleteFeature(id, rootGetters["user/getToken"]);
    commit("removeFeature", id);
  },

  async fetchImages({ rootGetters }, id) {
    return await featureAPI.fetchImages(id, rootGetters["user/getToken"]);
  },

  async addImage({ dispatch, rootGetters }, { id, formData }) {
    await featureAPI.addImage(id, formData, rootGetters["user/getToken"]);
    await dispatch("fetchImages", id);
  },
};
