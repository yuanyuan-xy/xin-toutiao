<template>
  <div class="publish">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>发布文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="article" label-width="40px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
           <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="article.channel_id" placeholder="请选择">
              <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in channels"
              :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish(false)">发布</el-button>
            <el-button @click="onPublish(true)">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
// 引入接口
import { getArticleChannels, addArticle } from '@/api/article.js'
export default {
  name: 'PublishIndex',
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      }
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    onPublish (draft) {
      addArticle(this.article, draft).then(res => {
        if (draft) {
          this.$message('存为草稿成功')
        } else {
          this.$message('发布内容成功')
        }
        this.$router.push('/article')
      })
    },
    getChannels () {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style>

</style>
