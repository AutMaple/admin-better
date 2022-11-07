import config from "@/configs"
import {encryptedData} from "@/utils/encrypt";
import request from "@/utils/request";


export async function login(data) {
  if (config.loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/login",
    method: "post",
    data,
  })
}