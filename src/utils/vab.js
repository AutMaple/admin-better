import store from "@/store"
import config from "@/configs"
import {getAccessToken} from "@/utils/accessToken";
import {Loading, Message, MessageBox, Notification} from "element-ui";
import lodash from "lodash";


const accessToken = store.getters["user/accessToken"]
const layout = store.getters["settings/layout"]

const install = (Vue) => {

  /**
   * 全局 AccessToken
   */
  Vue.prototype.$baseAccessToken = () => {
    return accessToken || getAccessToken()
  }
  /**
   * 全局标题
   */
  Vue.prototype.$baseTitle = (() => {
    return config.title
  })()

  /**
   * 全局加载层
   */
  Vue.prototype.$baseLoading = (index, text) => {
    let loading
    if (!index) {
      loading = Loading.service({
        lock: true,
        text: text || config.loadingText,
        background: 'hsla(0, 0%, 100%, .8)'
      })
    } else {
      loading = Loading.service({
        lock: true,
        text: text || config.loadingText,
        spinner: 'vab-loading-type' + index,
        background: 'hsla(0 ,0%, 100%, .8)'
      })
    }
    return loading
  }

  /***
   * 全局多彩加载层
   */
  Vue.prototype.$baseColorfulLoading = (index, text) => {
    let loading
    if (!index) {
      loading = Loading.service({
        lock: true,
        text: text || config.loadingText,
        spinner: 'dots-loader',
        background: 'hsla(0, 0%, 100%, .8)'
      })
    } else {
      switch (index) {
        case 1:
          index = 'dots'
          break
        case 2:
          index = 'gauge'
          break;
        case 3:
          index = 'inner-circle'
          break
        case 4:
          index = 'plus'
          break
      }
      loading = loading.service({
        lock: true,
        text: text || config.loadingText,
        spinner: index + '-loader',
        background: 'hsla(0, 0%, 100%, .8)'
      })
    }
    return loading
  }

  /**
   * 全局 Message
   */
  Vue.prototype.$baseMessage = function (message, type) {
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: config.messageDuration
    })
  }


  /**
   * 配置全局 Alert
   */
  Vue.prototype.$baseAlert = (content, title, callback) => {
    MessageBox.alert(content, title || "温馨提示", {
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      // eslint-disable-next-line no-unused-vars
      callback: (action) => {
        if (callback) {
          callback()
        }
      }
    })
  }

  /**
   * 全局 Confirm
   */
  Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
    MessageBox.confirm(content, title || "温馨提示", {
      confirmButtonText: '确定',
      cancelButtonText: "取消",
      closeOnClickModal: false,
      type: 'warning'
    }).then(() => {
      if (callback1) {
        callback1()
      }
    }).then(() => {
      if (callback2) {
        callback2()
      }
    })
  }

  /**
   * 全局 Notification
   */
  Vue.prototype.$baseNotify = (message, title, type, position) => {
    Notification({
      title,
      message,
      position: position || "top-right",
      type: type || 'success',
      duration: config.messageDuration
    })
  }

  /**
   * 设置全局 Table 高度
   * @param formType
   * @returns {number}
   */
  Vue.prototype.$baseTableHeight = (formType) => {
    let height = window.innerHeight
    let paddingHeight = 400
    const formHeight = 50
    if (layout === 'vertical') {
      paddingHeight = 365
    }

    if ('number' == typeof formType) {
      height = height - paddingHeight - formHeight * formType
    } else {
      height = height - paddingHeight
    }
    return height
  }

  /**
   * 全局 lodash
   */
  Vue.prototype.$baseLodash = lodash

  /**
   * 全局事件总线
   */
  Vue.prototype.$baseEventBus = new Vue()
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export default install


