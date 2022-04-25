import {userAPI} from '../../api';


export default {
  async authorize({commit}, userData) {
    let res = await userAPI.authorize(userData);
    if (!res.status) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(res, 'data')) {
      return false;
    }

    commit('setUserData', res.data);
    // TODO: interval for refresh
    return true;
  },

  async register({commit}, userData) {
    let result = await userAPI.register(userData);
    if (!Object.prototype.hasOwnProperty.call(result, 'id')) {
      return false;
    }
    commit('setUserData', result);
    return true;
  },

  async refreshToken() {

  },

  async logOut() {

  },

  setUpdateInterval({dispatch}, timeout) {
    return setInterval(async () => {
      dispatch("refreshToken")
    }, timeout);
  }
};
