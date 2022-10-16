<template>
  <div class="edit-content-container">
    <div class="content-left"></div>
    <div class="content-right">
      <el-form ref="form" :model="condition" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="condition.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="condition.abstract"></el-input>
        </el-form-item>
        <el-form-item label="内容类型">
          <el-radio v-model="condition.contentType" label="markdown">markdown</el-radio>
          <el-radio v-model="condition.contentType" label="html">html</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="condition.status" placeholder="请选择状态">
            <el-option label="草稿" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="撤回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload class="avatar-uploader" action :show-file-list="false" :before-upload="beforeUpload">
            <img v-if="condition.imgUrl" :src="condition.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { findOneContent } from '@/api/docManage.js'
import { uploadFile } from '@/api/common.js'
export default {
  data () {
    return {
      id: '',
      condition: {

      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getContentInfo()
    }
  },
  methods: {
    getContentInfo () {
      findOneContent({ id: this.id }).then(res => {

      })
    },
    // 上传图片
    beforeUpload (file) {
      console.log(file)
      let submit = new FormData()
      submit.append("file", file.raw)
      console.log(submit)
      uploadFile(submit).then(res => {
        this.condition.imgUrl = res.data
      })
      return false
    },
    // 提交文章
    onSubmit () {

    }
  }
}
</script>

<style lang="scss" scoped>
.edit-content-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  .content-left {
    width: calc(75% - 50px);
    height: 800px;
    padding: 10px;
    background: #fbfbfb;
  }
  .content-right {
    width: 24%;
    height: 800px;
    background: #fbfbfb;
    padding: 10px;
    .avatar-uploader {
      /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    }
    .avatar-uploader {
      .el-upload:hover {
        border-color: #409eff;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>