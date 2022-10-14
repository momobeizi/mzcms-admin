<template>
  <div class="content-container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.content-container {
  background: #f5f7f9;
  height: calc(100% - 90px);
  width: calc(100% - 40px);
  padding: 20px;
  .content {
    padding: 16px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>