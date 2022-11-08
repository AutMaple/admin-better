/**
 * @description 导入所有 controller 模块，浏览器环境中自动输出 controller 文件夹下的 Mock 接口
 */
import Mock from "mockjs";

import { parseObj } from "@/utils";

const mocks = [];

const files = require.context("../../mock/controller", false, /\.js$/);

files.keys().forEach((key) => {
  mocks.push(...files(key).default);
});
export const mockXHR = () => {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;
      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    // eslint-disable-next-line no-undef
    this.proxy_send(...arguments);
  };

  function XHRHttpRequest(response) {
    return function (options) {
      let result;
      if (response instanceof Function) {
        const { body, type, url } = options;
        result = response({
          method: type,
          body: JSON.parse(body),
          query: parseObj(url),
        });
      } else {
        result = response;
      }
      console.log(result);
      return Mock.mock(result);
    };
  }

  mocks.forEach((item) => {
    Mock.mock(
      new RegExp(item.url),
      item.type || "get",
      XHRHttpRequest(item.response),
    );
  });
};
