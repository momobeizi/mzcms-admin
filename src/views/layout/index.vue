<template>
  <div class="layout">
    <LeftMenu class="left-menu"></LeftMenu>
    <div class="right-content">
      <Header></Header>
      <Main></Main>
    </div>
  </div>
</template>

<script>
import Main from './main.vue'
import LeftMenu from './leftMenu'
import Header from './header.vue'
export default {
  components: {
    Main,
    LeftMenu,
    Header
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  .left-menu {
    height: 100%;
  }
  .right-content{
    width: calc(100% - 200px);
    height: 100%;
  }
}
</style>