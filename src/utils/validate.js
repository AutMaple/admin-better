/**
 * 判断是否是密码
 */
export const isPassword = (value) => {
    return value.length >= 6;
}

/**
 * 判断是否是手机号
 */
export const isPhone = (value) => {
    const regex = /^1\d{10}$/
    return regex.test(value)
}

/**
 * 判断是否是数组
 */
export const isArray = (value) => {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(value) === "[object Array]"
    }
}

/**
 * 判断是否是字符串
 */
export const isString = (str) => {
    return typeof str === "string" || str instanceof String
}