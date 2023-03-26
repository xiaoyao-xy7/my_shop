import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Users from "../components/user/Users.vue";
import Rights from "../components/power/Rights.vue";
import Roles from "../components/power/Roles.vue";
import Commodity from "../components/commodity/index.vue";
import Classify from "../views/classify/index.vue";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  routes: [
    // 重定向
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/home",
      component: Home,
      // 重定向 redirect
      redirect: "/welcome",
      children: [
        { path: "/welcome", component: Welcome },
        { path: "/users", component: Users },
        { path: "/rights", component: Rights },
        { path: "/roles", component: Roles },
        { path: "/goods", component: Commodity },
        { path: "/params", component: Classify }
      ]
    }
  ]
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  console.log('跳转a', to)
  //to 将要访问的页面路径
  //from 从哪个页面路径跳转而来的
  //next() 放行函数
  //next()  next('/login') 强制跳转

  //如果用户访问的登录页，直接放行
  if (to.path === "/login") return next();
  //获取token
  const tokenstr = window.sessionStorage.getItem("token");
  //没有token，强制跳转到登录页
  if (!tokenstr) return next("/login");
  const whiteList = ['/403', '/users', '/roles']
  // if(whiteList.includes(to.path)) {
    next();
  // }
});

// const whiteList = ['/403']
// router.beforeEach((to, from, next) => {
//     console.log('跳转', to)
// })


// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();
//   //获取token
//   const tokenstr = window.sessionStorage.getItem("token");
//   //没有token，强制跳转到登录页
//   if (!tokenstr) return next("/login");
//   if (to.query.username) {
//     next();
//     return;
//   };
//   if (from.query.username) {
//     let toQuery = JSON.parse(JSON.stringify(to.query));
//     toQuery.username = from.query.username;
//     next({
//       path: to.path,
//       query: toQuery
//     })
//   } else {
//     next()
//   }
// });



export default router;
