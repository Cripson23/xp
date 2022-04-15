export default {
  setFeatures(state, features) {
    state.features = features;
  },

  pushFeature(state, feature) {
    state.features.push(feature);
  }
}
