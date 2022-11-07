import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "",
      redirect: "/login",
    },
    {
      path: "/index",
      component: () => import("@/views/Index"),
    },
    {
      path: "/login",
      component: () => import("@/views/Login"),
    },
  ],
});
