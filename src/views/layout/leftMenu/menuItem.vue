<template>
  <div class="menu-wrap--in">
    <!-- 只显示第一层级路由 -->
    <!-- <template v-if="router.onlyFirstMenu">
      <el-menu-item :index="router.children[0].webLink"
        :style="{ paddingLeft: level != 1 ? 20 * level + 10 + 'px' : 20 * level + 'px' }">
        <div class="menu-wrap--placeholder" v-if="level == 1 && router.children[0].meta&&!router.children[0].meta.icon">
        </div>
        <mz-svg :name="router.children[0].meta.icon" v-if="router.children[0].meta&&router.children[0].meta.icon"
          class="icon"></mz-svg>
        <span v-if="router.children[0].meta&&router.children[0].meta.title"
          :class="['menu-wrap--con', 'menu-wrap--level' + level]" slot="title" :data-path="router.children[0].webLink"
          :level="level">
          {{ router.children[0].meta.title }}
        </span>
      </el-menu-item>
    </template> -->
    <el-submenu v-if="!router.hidden&&router.children && router.children.length > 0" :index="router.webLink"
      :key="router.name">
      <template slot="title">
        <div class="menu-wrap--placeholder" v-if="level == 1 && router.meta&&!router.meta.icon"></div>
        <mz-svg :name="router.meta.icon" v-if="router.meta&&router.meta.icon" class="icon"></mz-svg>
        <span :class="['menu-wrap--con', 'menu-wrap--level' + level]" v-if="router.name" slot="title"
          :data-path="router.webLink" :level="level"> {{ router.meta.title }}</span>
      </template>
      <template v-for="child in router.children">
        <menu-tree :router="child" :key="child.webLink" :level="level + 1"></menu-tree>
      </template>
    </el-submenu>
    <el-menu-item v-else-if="!router.hidden" :index="router.webLink"
      :style="{ paddingLeft: level != 1 ? 20 * level + 10 + 'px' : 20 * level + 'px' }">
      <div class="menu-wrap--placeholder" v-if="level == 1 && router.meta&&!router.meta.icon"></div>
      <mz-svg :name="router.meta.icon" v-if="router.meta&&router.meta.icon" class="icon"></mz-svg>
      <span v-if="router.meta&&router.meta.title" :class="['menu-wrap--con', 'menu-wrap--level' + level]" slot="title"
        :data-path="router.webLink" :level="level">
        {{ router.meta.title }}
      </span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "menu-tree",
  props: {
    router: {
      type: Object,
      default: function () {
        return {
          webLink: "",
          name: "",
          children: []
        };
      }
    },
    level: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped lang="scss">
.menu-wrap--in {
  overflow: hidden;
  /deep/ .el-submenu__title,
  /deep/ .el-menu-item {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 1.4em;
    height: 1.4em;
    vertical-align: middle;
    flex-shrink: 0;
  }

  .menu-wrap--placeholder {
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
  }

  .menu-wrap--con {
    font-size: 14px;
  }
  .menu-wrap--level1 {
    font-size: 16px;
    margin-left: 10px;
  }
  .menu-wrap--level2 {
    font-size: 14px;
    margin-left: 10px;
  }
}

.el-menu-vertical-mode.el-menu--collapse {
  .menu-wrap--in {
    /deep/ .el-submenu__title {
      justify-content: center;
      .menu-wrap--con {
        display: none;
      }
    }
  }
}
</style>
