<template>
  <div class="menu-container">
    <div class="menu-header" @click="$router.push({path:'/'})">
      <img class="header-logo" src="@/assets/logo.png" alt="">
      <span>MZCms管理系统</span>
    </div>
    <el-scrollbar class="menu-content">
      <el-menu mode="vertical" :unique-opened="true" router class="el-menu-vertical-mode" background-color="#1f2d3d"
        text-color="#ccc" active-text-color="#fff" :show-timeout="200" :collapse="opened" :default-active="activeIndex">
        <MenuItem v-for="(item, index) in permission_routers" :key="item.name + '_' + index" :router="item" :level="1">
        </MenuItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MenuItem from './menuItem.vue';
export default {
  components: {
    MenuItem
  },
  data () {
    return {
      activeIndex: ""
    }
  },
  computed: {
    ...mapGetters(["sidebar", "permission_routers"]),
    opened () {
      return false;
    }
  }, 
  watch: {
    "$route.path": function (n, o) {
      this.sidebarHightLight(this.permission_routers);
    }
  },
  created () {
    this.sidebarHightLight(this.permission_routers);
  },
  methods: {
    sidebarHightLight (routers) {
      const matchPath = this.$route.path;

      for (let i = 0; i < routers.length; i++) {
        const router = routers[i];
        if (router.webLink == matchPath) {
          this.activeIndex = matchPath;
          console.log(this.activeIndex)
          break;
        }
        if (router.children && router.children.length) {
          this.sidebarHightLight(router.children);
        } else {
          if (router.webLink.slice(0, router.webLink.lastIndexOf("/")) == matchPath.slice(0, matchPath.lastIndexOf("/"))) {
            this.activeIndex = router.webLink;
          }
        }
      }
    }
  }

}
</script>

<style scoped lang="scss">
.menu-container {
  background: #1f2d3d;
  .menu-header {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0d1117;
    cursor: pointer;
    .header-logo {
      height: 30px;
      width: auto;
    }
    span {
      color: #fff;
    }
  }
  .menu-content {
    // width: 200px;
  }
}

.el-menu-vertical-mode:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

/deep/ .el-menu-vertical-mode {
  &.el-menu {
    border-right: none;
  }

  > .menu-wrap--in {
    > .el-menu-item {
      border-bottom: 1px solid #1f2d3d;
    }
  }

  .el-submenu {
    border-bottom: 1px solid #1f2d3d;
  }

  .el-submenu__title {
    &:hover {
      background-color: transparent !important;
    }
  }
}

/deep/ .el-menu--collapse > .menu-wrap--in > .el-menu-item span,
/deep/
  .el-menu--collapse
  > .menu-wrap--in
  > .el-submenu
  > .el-submenu__title
  span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

/deep/
  .el-menu--collapse
  > .menu-wrap--in
  > .el-menu-item
  .el-submenu__icon-arrow,
/deep/
  .el-menu--collapse
  > .menu-wrap--in
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}

/deep/ .el-menu-vertical-mode {
  .menu-wrap--in {
    .el-menu-item {
      position: relative;
      &:focus,
      &:hover {
        background-color: #0d1620 !important;
        color: #fff !important;
      }

      &.is-active {
        background-color: #0d1620 !important;
        color: #fff !important;
        &:before {
          content: "";
          display: block;
          width: 4px;
          height: 100%;
          background: #0d1620;
          position: absolute;
          left: 0;
        }
      }
    }
  }
}
</style>
  <style lang="scss">
.el-menu--vertical {
  .menu-wrap--in {
    .el-menu-item {
      position: relative;

      &:focus,
      &:hover {
        background-color: #0d1620 !important;
        color: #fff !important;
      }

      &.is-active {
        background-color: #0d1620 !important;
        color: #fff !important;

        &:before {
          content: "";
          display: block;
          width: 4px;
          height: 100%;
          background: #0d1620;
          position: absolute;
          left: 0;
        }
      }
    }
  }
}
</style>
  