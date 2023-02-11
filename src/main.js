import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
//导入全局样式表
import "./assets/css/global.css";
// 导入字体图标
import "./assets/fonts/iconfont.css";
import './directives/permission/permission.js'
// import './routerPermission'

// permission(router)

import axios from "axios";
// 配置请求的跟路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  // 最后必须return
  return config;
});
// 把axios挂载到VUE的原型对象上
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.directive("btn", {
  inserted: function (el, binding) {
    const a = store.getters.btnArr;
    function checkAdult(age) {
      return (age = 30);
    }

    function myFunction() {
      // console.log(a.find(checkAdult));
    }
    myFunction();
    // console.log(a);
    if (!a.includes(binding.value)) {
      el.parentNode.removeChild(el);
      // console.log(a.includes(1));
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
