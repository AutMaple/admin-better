import config from "@/configs"

/**
 * 获取 accessToken
 */
export const getAccessToken = () => {
  if (config.storage) {
    if (config.storage === 'localStorage') {
      return localStorage.getItem(config.tokenTableName)
    } else if (config.storage === 'sessionStorage') {
      return sessionStorage.getItem(config.tokenTableName);
    } else {
      return localStorage.getItem(config.tokenTableName)
    }
  } else {
    return localStorage.getItem(config.tokenTableName)
  }
}

/**
 * 存储 accessToken
 */
export const setAccessToken = (accessToken) => {
  if (config.storage) {
    if (config.storage === 'localStorage') {
      return localStorage.setItem(config.tokenTableName, accessToken);
    } else if (config.storage === 'sessionStorage') {
      return sessionStorage.setItem(config.tokenTableName, accessToken);
    } else {
      return localStorage.setItem(config.tokenTableName, accessToken);
    }
  } else {
    return localStorage.setItem(config.tokenTableName, accessToken);
  }
}

/**
 * 删除 accessToken
 */
export const removeAccessToken = () => {
  if (config.storage) {
    if (config.storage === 'localStorage') {
      return localStorage.removeItem(config.tokenTableName);
    } else if (config.storage === 'sessionStorage') {
      return sessionStorage.removeItem(config.tokenTableName);
    } else {
      return localStorage.removeItem(config.tokenTableName);
    }
  } else {
    return localStorage.removeItem(config.tokenTableName);
  }
}