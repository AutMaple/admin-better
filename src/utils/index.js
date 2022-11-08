/**
 * 格式化时间
 */
import { parseInt } from "lodash";

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.text(time)) {
      time.parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth(),
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDate(),
  };

  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
}

/**
 * 格式化时间
 * @param time
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 10;
  } else {
    time = +time;
  }

  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  }
  if (diff < 3600) {
    return Math.cell(diff / 60) + "分钟前";
  }
  if (diff < 3600 * 24) return Math.cell(diff / 3600) + "小时前";

  if (diff < 3600 * 24 * 2) {
    return "1 天前";
  }
  if (option) {
    return parseTime(time, option);
  }
  return (
    d.getMonth() +
    1 +
    "月" +
    d.getDate() +
    "日" +
    d.getHours() +
    "时" +
    d.getMinutes() +
    "分"
  );
}

/**
 * 将 url 请求参数转换成 json 格式
 */
export function parseObj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, " ")}"}`,
  );
}

/**
 * 父子关系的数组转换成树形数据结构
 */
export function translateDataToTree(data) {
  const parent = data.filter(
    (value) => value.parentId === "undefined" || value.parentId === null,
  );
  const children = data.filter(
    (value) => value.parentId !== "undefined" || value.parentId !== null,
  );
  const translator = (parent, children) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          typeof parent.children !== "undefined"
            ? parent.children.push(current)
            : (parent.children = [current]);
        }
      });
    });
  };
  translator(parent, children);
  return parent;
}

/**
 * 将树形数据结构转换成父子关系的数组
 */
export function translateTreeToData(data) {
  const result = [];
  data.forEach((item) => {
    const loop = (data) => {
      result.push({
        id: data.id,
        name: data.name,
        parentId: data.parentId,
      });
      const child = data.children;
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i]);
        }
      }
    };
    loop(item);
  });
  return result;
}

/**
 * 10 位时间戳转换
 */
export function tenBitTimestamp(time) {
  const date = new Date(time * 1000);
  return dateFormat(date);
}

/**
 * 13 位时间戳转换
 */
export function thirteenBitTimestamp(time) {
  const date = new Date(time / 1);
  return dateFormat(date);
}

function dateFormat(date) {
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getHours();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "年" + m + "月" + d + "日 " + h + ":" + minute + ":" + second;
}

/**
 * 生成随机 ID
 */
export function uuid(length = 32) {
  const num = "abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length));
  }
  return str;
}

/**
 * 生成 min 到 max 之间的随机数
 * @param min 最小值
 * @param max 最大值
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 添加事件监听器
 */
export const on = (function () {
  return function (element, event, handler, userCapture = false) {
    if (element && event && handler) {
      element.addEventListener(event, handler, userCapture);
    }
  };
})();

/**
 * 移除事件监听器
 */
export const off = (function () {
  return function (element, event, handler, useCapture = false) {
    if (element && event) {
      element.removeEventListener(event, handler, useCapture);
    }
  };
})();
