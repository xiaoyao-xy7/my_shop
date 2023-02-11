import state from "./state";

export const userInfoList = function(state) {
  return state.userInfoList;
};
export const btnArr = function(state) {
  return state.btnArr;
};
export const baseUrl = function(state) {
  return state.env.baseUrl;
};