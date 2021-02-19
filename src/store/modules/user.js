const state = {
  user: {},
  coin: 0, // 游戏币
  point: 0 // 积分
};

const mutations = {
  UPDATE_USER: (state, data) => {
    state.user = data;
  },
  UPDATE_COIN: (state, data) => {
    state.coin = data;
  },
  UPDATE_POINT: (state, data) => {
    state.point = data;
  }
};

const actions = {
  updateUser({ commit }, data) {
    commit("UPDATE_USER", data);
  },
  updateCoin({ commit }, data) {
    commit("UPDATE_COIN", data);
  },
  updatePoint({ commit }, data) {
    commit("UPDATE_POINT", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
