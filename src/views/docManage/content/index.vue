<template>
  <div class="article-container">
    <div class="mz-search-container">
      <el-form :model="condition">
        <el-form-item label="文章名称:" prop="type">
          <el-input v-model.trim="condition.title" placeholder="请输入文章名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" plain> 快速搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mz-button-container">
      <div class="mz-button--left">
        <el-button type="primary" @click="editArticle()">添加文章</el-button>
      </div>
    </div>
    <el-table :data="list" stripe border style="width: 100%" height="600">
      <el-table-column prop="title" label="文章名称"></el-table-column>
      <el-table-column prop="contentType" label="文章类型"></el-table-column>
      <el-table-column prop="label" label="标签">
        <template slot-scope="scope">
          <el-tag>{{scope.row.label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contentCategory" label="文章类别">
        <template slot-scope="scope">
          <el-tag>{{scope.row.contentCategory|categoryFilter(CategoryList)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <mz-svg v-if="scope.row.status==0" name="caogao" class="status-icon"></mz-svg>
          <mz-svg v-if="scope.row.status==1" name="yifabu" class="status-icon"></mz-svg>
          <mz-svg v-if="scope.row.status==2" name="chehui" class="status-icon"></mz-svg>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          {{$moment(scope.row.createdAt).format('YYYY-MM-DD hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editArticle(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="condition.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="condition.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="condition.total">
    </el-pagination>
  </div>
</template>

<script>
import { getContentList, deleteContent } from '@/api/docManage'
import { getAllContentCategory } from '@/api/docManage.js'
export default {
  data () {
    return {
      condition: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        title: ''
      },
      list: [],
      CategoryList: [] // 分类列表
    }
  },
  filters: {
    categoryFilter (val, list) {
      let result = list.find(item => item.id == val)
      return result ? result.name : ''
    }
  },
  created () {
    this.getAllContentCategory()
    this.search()
  },
  methods: {
    // 添加或者编辑文章
    editArticle (id) {
      this.$router.push({
        name: 'editContent',
        query: {
          id
        }
      })
    },
    // 获取所有文章类别
    getAllContentCategory () {
      getAllContentCategory().then(res => {
        this.CategoryList = res
      })
    },
    // 删除文章
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContent({ id: id }).then(() => {
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
      this.getList()
    },
    getList () {
      getContentList(this.condition).then(res => {
        this.list = res.list
        this.condition.total = res.count
      })
    },
    handleSizeChange (val) {
      this.condition.pageSize = val
      this.condition.pageNum = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.condition.pageNum = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  .status-icon {
    width: 3em;
    height: 3em;
  }
}
</style>