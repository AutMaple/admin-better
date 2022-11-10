import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/index",
      component: () => import("@/views/Layout"),
      children: [
        {
          path: "index",
          component: () => import("@/views/Index"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login"),
    },
    {
      path: "/register",
      component: () => import("@/views/Register"),
    },
    {
      path: "/401",
      component: () => import("@/views/401"),
    },
    {
      path: "/404",
      component: () => import("@/views/404"),
    },
  ],
});
