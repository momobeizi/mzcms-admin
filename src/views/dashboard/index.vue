<template>
  <div>欢迎使用MZCms内容管理系统 <el-button @click="goPath">测试点击按钮</el-button>
    <el-dialog title="提示" :visible.sync="visible" width="30%">
      <span>处理数据中{{time}}s</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { downloadBigFile } from '@/api/common.js'
export default {
  data () {
    return {
      visible: false,
      timer: null,
      time: 1
    }
  },
  watch: {
    visible (n, o) {
      if (o) {
        console.log("关闭")
        clearInterval(this.timer)
        this.time = 1
      }
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    startTime () {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    goPath () {
      this.visible = true;
      this.startTime();
      downloadBigFile().then((res) => {
        this.$downStreamCheck(res).then(() => {
          this.$downloadBlob(res.data, "application/zip", 'file.zip');
          this.visible = false;
        }).catch(()=>{
          this.visible = false;
        })
      })
    }
  }
}
</script>

<style>
</style>

