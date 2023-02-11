import * as types from "./mutation-types";

export const pushUser = function({ commit, state }, product) {
  commit(types.PUSH_USERINFO, { userInfoList: product });
};

// export const pushBtn = function({ commit, state }, product) {
//   commit(types.PUSH_BTN, { btnArr: product });
// };

export const pushBtn = function({ commit, state }, product) {
  commit(types.PUSH_USERINFO, state.btnArr.push(product));
};
