import {getAccessToken, removeAccessToken, setAccessToken} from "@/utils/accessToken";
import {login} from "@/api/user";
import configs from "@/configs";
import Vue from "vue";


const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '', // 头像
  permissions: [],
}
const actions = {
  setPermissions({commit}, permissions) {
    commit('setPermissions', permissions);
  },
  async login({commit}, userInfo) {
    const {data} = await login(userInfo);
    const accessToken = data[configs.tokenName];
    if (accessToken) {
      commit("setAccessToken", accessToken)
      const hour = new Date().getHours()
      const thisTime = hour < 8 ? '早上好' : hour <= 11 ? "上午好" : hour <= 13 ? "中午好" : hour < 18 ? "下午好" : "晚上好"
      Vue.prototype.$baseNotify(`欢迎登录${configs.title}`, `${thisTime}`)
    }else {
      Vue.prototype.$baseMessage(`登录接口异常，未正确返回${configs.tokenName}...`, "error")
    }
  },
  resetAccessToken({commit}) {
    commit("setPermissions", []);
    commit("setAccessToken", '')
    removeAccessToken()
  }
}

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  }
}

const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions
}

export default {state, actions, mutations, getters};
