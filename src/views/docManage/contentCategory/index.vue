<template>
  <div class="category-container">
    <el-button class="add-btn" type="primary" @click="editCategory()">新增</el-button>
    <el-tree :data="list">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- <span>{{data}}</span> -->
        <span>{{data.name}}</span>
        <mz-svg @click.native="editCategory(data)" name="bianji" class="icon"></mz-svg>
        <mz-svg @click.native="deleteCategory(data)" name="delete" class="icon"></mz-svg>
      </span>
    </el-tree>

    <el-dialog title="文档类别" :visible.sync="editVisible" width="30%">
      <el-form :model="editCondition" :rules="conditionRules" ref="editConditionForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editCondition.name"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="editCondition.keywords"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
          <el-switch v-model="editCondition.enable"></el-switch>
        </el-form-item>
        <el-form-item label="描述" prop="comments">
          <el-input v-model="editCondition.comments"></el-input>
        </el-form-item>
        <el-form-item label="父级" prop="parentId">
          <el-select v-model="editCondition.parentId" placeholder="请选择活动区域">
            <el-option label="顶层菜单" :value="0"></el-option>
            <el-option v-for="item in CategoryList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="editCondition.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('editConditionForm')" :loading="editLoading">更新</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllContentCategory, getOneContentCategory, editContentCategory, deleteContentCategory, addContentCategory } from '@/api/docManage.js'
export default {
  data () {
    return {
      CategoryList: [],
      list: [],
      conditionObj: {
        parentId: 0,
        name: "",
        keywords: "",
        url: "",
        enable: 1,
        comments: ""
      },
      editCondition: {},
      editVisible: false,
      editLoading: false,
      options: '',
      conditionRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ],
        comments: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAllContentCategory()
  },
  methods: {
    submitEditForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editLoading = true
          this.editCondition.enable = Number(this.editCondition.enable)
          if (this.editCondition.id) {
            editContentCategory(this.editCondition).then(() => {
              this.$message.success('更新成功')
              this.getAllContentCategory();
              this.editLoading = false;
              this.editVisible = false;
            }).catch(() => {
              this.editLoading = false
            })
          } else {
            addContentCategory(this.editCondition).then(() => {
              this.$message.success('添加成功')
              this.getAllContentCategory();
              this.editLoading = false;
              this.editVisible = false;
            }).catch(() => {
              this.editLoading = false
            })
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取所有类别
    getAllContentCategory () {
      getAllContentCategory().then(res => {
        this.CategoryList = Object.assign({}, res)
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
    editCategory (data) {
      if (data) {
        getOneContentCategory({ id: data.id }).then(res => {
          this.editCondition = res;
          this.editVisible = true
        })
      } else {
        this.editCondition = Object.assign({}, this.conditionObj)
        this.editVisible = true
      }
    },
    // 删除节点
    deleteCategory (data) {
      if (data.children.length > 0) {
        this.$message.warning('该分类下还存在子分类，请删除子分类后再试！')
        return false
      }
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContentCategory({ id: data.id }).then(() => {
          this.$message.success('删除成功')
          this.getAllContentCategory()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  .add-btn {
    margin-bottom: 10px;
  }
  .custom-tree-node {
    .icon {
      margin-left: 10px;
    }
  }
}
</style>