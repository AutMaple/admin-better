import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
import settings from "./modules/settings"
import tabsBar from "./modules/tabsBar"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user,
    settings,
    tabsBar
  }
});
