import config from "@/configs";
import { encryptedData } from "@/utils/encrypt";
import request from "@/utils/request";

const { tokenName } = config;

export async function login(data) {
  if (config.loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export const getUserInfo = (accessToken) => {
  return request({
    url: "/userInfo",
    method: "post",
    data: {
      [tokenName]: accessToken,
    },
  });
};

export const logout = () =>
  request({
    url: "/logout",
    method: "post",
  });

export const register = () =>
  request({
    url: "/register",
    method: "post",
  });
