<template>
  <div class="user-container">
    <div class="mz-search-container">
      <el-form :model="condition">
        <el-form-item label="用户名称:" prop="type">
          <el-input v-model.trim="condition.userName" placeholder="请输入用户名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" plain> 快速搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mz-button-container">
      <div class="mz-button--left">
        <el-button type="primary">添加用户</el-button>
      </div>
    </div>
    <el-table :data="list" stripe border style="width: 100%" height="600">
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="picture" label="头像"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          {{$moment(scope.row.createdAt).format('YYYY-MM-DD hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="condition.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="condition.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="condition.total">
    </el-pagination>

    <el-dialog title="编辑用户信息" :visible.sync="editVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/sysManage'
export default {
  data () {
    return {
      condition: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        userName: ''
      },
      list: [],
      editVisible: false,
      editUserInfo: {
        userName:'',
        nickName:''
      }
    }
  },
  created () {
    this.search()
  },
  methods: {
    // 删除用户
    handleDelete (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.search()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    search () {
      this.condition.pageNum = 1
      this.getUserList()
    },
    getUserList () {
      getUserList(this.condition).then(res => {
        console.log(res)
        this.list = res.list
        this.condition.total = res.count
      })
    },
    handleSizeChange (val) {
      this.condition.pageSize = val
      this.condition.pageNum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.condition.pageNum = val
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
}
</style>