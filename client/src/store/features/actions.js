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

  async editFeature({ commit, rootGetters }, { id, data }) {
    let res = await featureAPI.editFeature(
      id,
      data,
      rootGetters["user/getToken"]
    );
    commit("editFeature", { id, feature: res });
  },

  async fetchImages({ rootGetters }, id) {
    return await featureAPI.fetchImages(id, rootGetters["user/getToken"]);
  },

  async addImage({ dispatch, rootGetters }, { id, formData }) {
    await featureAPI.addImage(id, formData, rootGetters["user/getToken"]);
    return await dispatch("fetchImages", id);
  },

  async acceptImage({ rootGetters }, { imageId, objectId }) {
    let res = await featureAPI.acceptImage(
      { imageId, objectId },
      rootGetters["user/getToken"]
    );

    return res.result;
  },

  async deleteImage({ rootGetters }, { imageId, objectId }) {
    let res = await featureAPI.deleteImage(
      { imageId, objectId },
      rootGetters["user/getToken"]
    );

    return res.result;
  },
};
