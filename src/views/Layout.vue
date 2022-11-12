<template>
  <el-row>
    <el-col :span="4">
      <div class="side-bar-container-wrapper">
        <div class="side-bar-container">
          <el-scrollbar>
            <div class="side-bar-icon-container">
              <router-link to="/index" class="side-bar-icon-content">
                vue-admin-better
              </router-link>
            </div>
            <div class="side-bar-menu-container">
              <el-menu class="side-bar-menu-content" text-color="#f4f4f4">
                <MenuTree :data="menu" />
              </el-menu>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="main-container">
        <div class="main-header-container"></div>
        <div class="main-content-container">
          <router-view></router-view>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {
    Card,
    Col,
    Menu,
    MenuItem,
    MenuItemGroup,
    Row,
    Scrollbar,
    Submenu,
  } from "element-ui";
  import { getMenu } from "@/api/common";
  import MenuTree from "@/components/MenuTree";
  // import Vue from "vue";

  // Vue.use(Scrollbar);

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Layout",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      MenuTree,
      [Row.name]: Row,
      [Col.name]: Col,
      [Menu.name]: Menu,
      [MenuItemGroup.name]: MenuItemGroup,
      [MenuItem.name]: MenuItem,
      [Submenu.name]: Submenu,
      [Card.name]: Card,
      [Scrollbar.name]: Scrollbar,
    },
    data() {
      return {
        menu: null,
      };
    },
    mounted() {
      this.initData();
    },
    methods: {
      async initData() {
        let response = await getMenu();
        this.menu = response.data;
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/styles/common.scss";
  @import "@/styles/variables.scss";

  .side-bar-container-wrapper {
    .side-bar-container {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100vh;
      z-index: 999;
      width: 256px;

      .side-bar-icon-container {
        background-color: #333743;
        padding: 30px 20px;

        .side-bar-icon-content {
          color: white;
          text-align: center;
          display: inline-block;
          width: 100%;
          font-size: 25px;
        }
      }

      .side-bar-menu-container {
        height: 100%;
        font-size: 20px;

        .side-bar-menu-content {
          background-color: #333743;
          height: 100%;
          border-right: 0;
          color: #f4f4f4;
        }
      }
    }
  }

  .main-container {
    margin-left: 260px;
  }

  ::v-deep {
    .el-scrollbar {
      height: 100%;
      background-color: #333743;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>