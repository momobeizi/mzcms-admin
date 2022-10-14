<template>
  <div>欢迎使用MZCms内容管理系统 <el-button @click="goPath">测试点击按钮</el-button>
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$route)
  },
  methods: {
    goPath () {
      console.log(this.$router)
      this.$router.push({
        path: '/sysManage/userManage'
      })
    }
  }
}
</script>

<style>
</style>

