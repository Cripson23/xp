import { userAPI } from "../../api";

export default {
  async authorize({ commit }, userData) {
    let res = await userAPI.authorize(userData);
    if (!res.status) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(res, "data")) {
      return false;
    }

    commit("setUserData", res.data);
    localStorage.setItem("xp_user", JSON.stringify(res.data));
    // TODO: interval for refresh
    return true;
  },

  async register({ commit }, userData) {
    let result = await userAPI.register(userData);
    if (!Object.prototype.hasOwnProperty.call(result, "id")) {
      return false;
    }
    commit("setUserData", result);
    return true;
  },

  async refreshToken() {},

  async logOut({ commit }) {
    commit("setUserData", null);
    localStorage.removeItem("xp_user");
  },

  setUpdateInterval({ dispatch }, timeout) {
    return setInterval(async () => {
      dispatch("refreshToken");
    }, timeout);
  },

  restoreUserOnReload({ commit }) {
    let userData = localStorage.getItem("xp_user");
    if (userData) {
      commit("setUserData", JSON.parse(userData));
    }
  },
};
