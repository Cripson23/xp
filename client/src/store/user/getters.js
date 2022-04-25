export default {
  getUserData(state) {
    return state.user
  },

  getToken(state) {
    return state.user?.token;
  },

  getTokenInterval(state) {
    return state.updateTokenInterval;
  },

  isModerator(state) {
    return state.user?.moderator;
  },

  isLoggedIn(state) {
    return !!state.user;
  },
}
