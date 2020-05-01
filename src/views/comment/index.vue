<template>
  <div class="commentIndex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
      :data="comments"
      style="width: 100%"
      v-loading="isLoading"
      >
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="评论数量"
      >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数量">
      </el-table-column>
      <el-table-column
        label="是否开启评论">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.loading"
            @change="changeCommentStatus(scope.row)"
            >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:30px"></div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      background
      :disabled="paginationDisabled"
      >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入获取评论列表
import { getArticles, editCommentStatus } from '@/api/article'
export default {
  name: 'commentIndex',
  data () {
    return {
      comments: [], // 评论列表的数据
      totalCount: 0, // 数据总数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示多少条数据
      isLoading: false,
      paginationDisabled: false
    }
  },
  created () {
    this.loadComment(1)
  },
  methods: {
    // 获取评论列表
    loadComment (page) {
      this.paginationDisabled = true
      this.isLoading = true
      this.currentPage = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        this.paginationDisabled = false
        this.isLoading = false
        const results = res.data.data.results
        results.forEach(item => {
          item.loading = false
        })
        this.comments = results
        this.totalCount = res.data.data.total_count
      })
    },
    // 改变评论状态
    changeCommentStatus (item) {
      item.loading = true
      editCommentStatus(
        item.id.toString(), item.comment_status
      ).then(res => {
        item.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadComment(1)
    },
    // 页码改变
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadComment(this.currentPage)
    }
  }
}
</script>

<style>

</style>
