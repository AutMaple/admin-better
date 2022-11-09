<template>
  <div class="login-container">
    <el-alert
        title="Beautiful boys and girls, Welcome to the admin-better"
        type="success"
        :closeable="false"
        style="position: fixed"/>
    <el-row type="flex" justify="end">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            class="login-form">
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']"></vab-icon>
            </span>
            <el-input
                v-model.trim="form.username"
                v-focus
                type="text"
                placeholder="请输入用户名"
                tabindex="1"/>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']"/>
            </span>
            <el-input
                v-model.trim="form.password"
                :key="passwordType"
                ref="password"
                :type="passwordType"
                tabindex="2"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin"/>
            <span
                v-if="passwordType === 'password'"
                class="show-password"
                @click="handlePassword">
              <vab-icon :icon="['fas', 'eye-slash']"/>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"/>
            </span>
          </el-form-item>
          <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="handleLogin">
            登录
          </el-button>
          <router-link to="/register">
            <div style="margin-top: 20px" class="register-btn">注册</div>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Alert, Button, Col, Form, FormItem, Input, Row} from "element-ui";
import {isPassword} from "@/utils/validate";
import config from "@/configs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    "el-form": Form,
    "el-form-item": FormItem,
    "el-input": Input,
    "el-alert": Alert,
    "el-row": Row,
    "el-col": Col,
    "el-button": Button,
  },
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if ("" === value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码长度不能够少于 6 位"));
      } else {
        callback();
      }
    };

    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      title: config.title,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  created() {
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";
  },
  mounted() {
    this.form.username = "admin";
    this.form.password = "123456";
    // setTimeout(() => {
    //   this.handleLogin();
    // }, 3000);
  },
  methods: {
    handlePassword() {
      this.passwordType === "password"
          ? (this.passwordType = "")
          : (this.passwordType = "password");
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
              .dispatch("user/login", this.form)
              .then(() => {
                const routerPath =
                    this.redirect === "/404" || this.redirect === "/401"
                        ? "/"
                        : this.redirect;
                this.$router.push(routerPath).catch(() => {
                });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
@import "@/styles/variables.scss";


.login-container {
  height: 100vh;
  background: url('@/assets/login-images/background.jpg') center center fixed no-repeat;
  background-size: cover;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: rgba(14, 18, 26, 1);
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: rgba(14, 18, 26, 1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    display: inherit;
    width: 220px;
    height: 60px;
    margin: 5px 0;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 14px;
    left: 15px;
    z-index: $base-z-index;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .register-btn {
    color: $base-color-blue;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
        margin-left: 0 !important;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        font-size: $base-font-size-default;
        line-height: 58px;
        color: $base-font-color;
        background: #f6f4fc;
        border: 0;
        caret-color: $base-font-color;
      }
    }
  }
}
</style>
