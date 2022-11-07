export default {
  baseURL: "localhost", // 默认的接口地址
  contentType: "application/json;charset=UTF-8",
  messageDuration: 3000, // 消息框消失的时间
  requestTimeout: 5000, // 最长的请求时间
  successCode: [200, 0], // 操作正常对应的响应码,支持 String, Array, int 等多种类型
  invalidCode: 402, // 登录失效的 Code
  noPermissionCode: 401, // 没有权限对应的响应码
}