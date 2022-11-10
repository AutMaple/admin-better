<template>
  <el-row>
    <el-col :span="4">
      <div class="side-bar-container-wrapper">
        <div class="side-bar-container">
          <div class="side-bar-icon-container">
            <router-link to="/index" class="side-bar-icon-content">
              vue-admin-better
            </router-link>
          </div>
          <div class="side-bar-menu-container">
            <el-menu class="side-bar-menu-content" text-color="#f4f4f4">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
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
    Row,
    Col,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Card,
  } from "element-ui";

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Layout",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Menu.name]: Menu,
      [MenuItemGroup.name]: MenuItemGroup,
      [MenuItem.name]: MenuItem,
      [Submenu.name]: Submenu,
      [Card.name]: Card,
    },
  };
</script>

<style scoped lang="scss">
  @import "@/styles/common.scss";
  @import "@/styles/variables.scss";

  .side-bar-container-wrapper {
    overflow: hidden;

    .side-bar-container {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100vh;
      overflow: hidden;
      z-index: 999;

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
        height: 100vh;
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
    .el-menu {
      background-color: #333743;

      .is-active {
        background: #0187fb;
      }

      .is-opened {
        background: #333743;
      }
    }

    .el-menu-item {
      font-size: 14px;
      border-radius: 5px !important;
      margin: 5px 10px;

      &:hover {
        background: #0187fb !important;
      }

      i {
        color: white;
      }
    }

    .el-submenu {
      margin: 0 10px;
      border-radius: 5px !important;

      .el-submenu__title {
        i {
          color: white;
        }

        &:hover {
          outline: 0 !important;
          background: #263034 !important;
          color: white;
        }
      }
    }

    .el-menu-item.is-active {
      color: white;
    }
  }
</style>
