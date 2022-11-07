<template>
  <div class="login-container">
    <el-alert
      title="Beautiful boys and girls, Welcome to the admin-better"
      type="success"
      :closeable="false"
      style="position: fixed" />
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
              tabindex="1" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              v-model.trim="form.password"
              :key="passwordType"
              ref="password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin" />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword">
              <vab-icon :icon="['fas', 'eye-slash']" />
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']" />
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
            <div style="margin-top: 20px">注册</div>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Form, FormItem, Input, Alert, Row, Col, Button } from "element-ui";
  import { isPassword } from "@/utils/validate";
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
        handle(route) {
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
      setTimeout(() => {
        this.handleLogin();
      }, 3000);
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
          if(valid) {
            this.loading =true;
            this.$store.dispatch('user/login', this.form)
          }
        })
      }
    },
  };
</script>

<style scoped lang="scss">
  .login-container {
    height: 100vh;
    background: url("@/assets/login-images/background.jpg") center center
      no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }
  }
</style>
