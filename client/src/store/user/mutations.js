export default {
  setUserData(state, userData) {
    state.user = userData;
  },

  setToken(state, token) {
    state.user.token = token;
  },

  setTokenInterval(state, interval) {
    state.updateTokenInterval = interval;
  }
}
