<template>
  <div class="edit-content-container">
    <div class="content-left">
      <mavon-editor v-model="condition.content" ref=md @imgAdd="mdAddImage" @imgDel="mdDelImage"></mavon-editor>
    </div>
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
        <el-form-item label="分类">
          <el-cascader v-model="condition.contentCategory" :options="options" :show-all-levels="false"></el-cascader>
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
import { findOneContent, addContent, getAllContentCategory } from '@/api/docManage.js'
import { uploadFile } from '@/api/common.js'
export default {
  data () {
    return {
      id: '',
      condition: {
        title: '',// 文章标题
        abstract: '',// 摘要
        content: '',// 内容
        status: '',// 状态
        contentCategory: '',// 分类
        keywords: '',// 关键字
        imgUrl: '',// 封面图片
        readNum: '',// 是否推荐
        label: '',// 标签
        contentType: '',// 文章内容类型
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.condition.id = this.$route.query.id
      this.getContentInfo()
    }
  },
  methods: {
    // 获取所有类别
    getAllContentCategory () {
      getAllContentCategory().then(res => {
        this.list = this.handleCategoryList(res)
        console.log(this.list)
      })
    },
    // 处理层级结构数组
    handleCategoryList (list) {
      let data = list.filter(item => {
        item.children = list.filter(e => {
          return item.id == e.parentId
        })
        return item.parentId == 0
      })
      return data.length > 0 ? data : list;
    },
    getContentInfo () {
      findOneContent({ id: this.id }).then(res => {

      })
    },
    // 上传图片
    beforeUpload (file) {
      let formdata = new FormData()
      formdata.append("file", file)
      uploadFile(formdata).then(url => {
        this.condition.imgUrl = url
      })
      return false
    },
    // 提交文章
    onSubmit () {
      if (this.condition.id) {
        console.log("编辑")
      } else {
        addContent(this.condition).then(res => {
          console.log(res)
        })
      }
    },
    // md上传图片
    mdAddImage (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      uploadFile(formdata).then((url) => {
        this.$refs.md.$img2Url(pos, url);
      })
    },
    // md删除图片
    mdDelImage (imgArray) {
      console.log(imgArray[0])
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
    .markdown-body {
      height: 100%;
    }
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