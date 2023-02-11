import * as types from "./mutation-types";

const mutations = {
  [types.PUSH_USERINFO](state, product) {
    state.userInfoList = product;
  }
};
export default mutations;
