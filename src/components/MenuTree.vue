<template>
  <div>
    <template v-for="item in data">
      <el-submenu
        v-if="item.subMenu && item.subMenu.length > 0"
        :index="item.id"
        :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.title }}</span>
        </template>
        <MenuTree :data="item.subMenu" />
      </el-submenu>
      <el-menu-item v-else :key="item.id" :index="item.id">
        {{ item.title }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  import { Submenu, MenuItem } from "element-ui";

  export default {
    name: "MenuTree",
    props: ["data"],
    components: {
      [Submenu.name]: Submenu,
      [MenuItem.name]: MenuItem,
    },
  };
</script>

<style scoped lang="scss">
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
      font-size: 20px;
      border-radius: 5px !important;
      margin: 5px 10px;

      &:hover,
      &:focus {
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
        font-size: 20px;

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
