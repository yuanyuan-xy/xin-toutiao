<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form :model="form" ref="form" label-width="100px" size="mini" :disabled="loading" v-loading="loading">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelsId" placeholder="请选择频道">
            <el-option
            label="全部"
            :value="null"
            ></el-option>
            <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in channelList"
            :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
          v-model="pubDate"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{totalCount}} 条结果：</span>
      </div>
      <!-- 表格 -->
      <el-table
        :data="articles"
        style="width: 100%"
        stripe
        class="list-table"
        size="mini"
        v-loading="loading"
        >
        <el-table-column
          prop="date"
          label="封面"
        >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            fit="cover"
            lazy
          >
            <!-- 加载时的占位符 -->
            <div slot="placeholder" class="image-slot" style="text-align:center">
              加载中<span class="dot">...</span>
            </div>
            <!-- 图片加载失败的时的填充的图片 -->
            <div slot="error" class="image-slot">
             <img src="./20.png" alt="">
            </div>
          </el-image>
          <!-- <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="article_cover">
          <img v-else src="./no-cover.gif" class="article_cover"> -->
        </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" type="info">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
              ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="delArticle(scope.row.id)"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        background
        @current-change="getCurrent"
        :disabled="loading"
        :current-page.sync="page"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入各个接口
import { getArticles, getArticleChannels, delArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      articles: [], // 文章数据列表
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articleStatus: [ // 文章状态
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 0, text: '审核通过', type: 'success' },
        { status: 0, text: '审核失败', type: 'warning' },
        { status: 0, text: '已删除', type: 'danger' }
      ],
      page: 1, // 当前页码
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据数
      status: null, // 文章的状态
      channelList: [], // 文章频道
      channelsId: null, // 选中的文章频道
      pubDate: null, // 筛选时间
      loading: true // 加载中
    }
  },
  created () {
    this.loadArticles()
    this.loadArticleChannels()
  },
  methods: {
    loadArticles (page = 1) { // 得到文章数据
      // 展示加载中
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelsId,
        begin_pubdate: this.pubDate ? this.pubDate[0] : null,
        end_pubdate: this.pubDate ? this.pubDate[1] : null
      }).then(res => {
        // 取消加载中
        this.loading = false
        const { total_count: totalCount, results } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onSubmit () {
      console.log('yuan')
    },
    getCurrent (page) {
      this.loadArticles(page)
    },
    loadArticleChannels () {
      getArticleChannels().then(res => {
        this.channelList = res.data.data.channels
      })
    },
    // 删除
    delArticle (delId) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(delId)
        delArticle(delId.toString()).then(res => {
          // 删除成功后跳转到当前页码
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article_cover {
  width: 60px;
}

</style>
