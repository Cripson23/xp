export default {
  setFeatures(state, features) {
    state.features = features;
  },

  pushFeature(state, feature) {
    state.features.push(feature);
  },

  removeFeature(state, id) {
    let index = state.features.findIndex((feature) => feature.id === id);
    if (index > -1) {
      state.features.splice(index, 1);
    }
  },

  editFeature(state, { id, feature }) {
    let index = state.features.findIndex((feature) => feature.id === id);
    if (index > -1) {
      state.features[index].name = feature.name;
      state.features[index].descriptionObject = feature.descriptionObject;
    }
  },
};
