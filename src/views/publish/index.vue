<template>
  <div class="publish">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="article" label-width="40px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-tiptap :extensions="extensions" v-model="article.content"></el-tiptap>
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
            <el-button type="primary" @click="onPublish(false)">{{$route.query.id ? '修改' : '发布'}}</el-button>
            <el-button @click="onPublish(true)">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
// 引入接口
import { getArticleChannels, addArticle, getArticle, editArticle } from '@/api/article.js'

// 引入富文本编辑器
import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image
} from 'element-tiptap'

// 引入富文本编辑器的样式
import 'element-tiptap/lib/index.css'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      channels: [], // 文章频道列表
      article: { // 提交的数据
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      // 富文本编辑器的数据
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image()
      ]
    }
  },
  created () {
    this.getChannels()
    if (this.$route.query.id) {
      this.getArticleInfo()
    }
  },
  methods: {
    onPublish (draft) {
      if (this.$route.query.id) {
        editArticle(this.$route.query.id, this.article, draft).then(res => {
          // if (draft) {
          //   this.$message('存为草稿成功')
          // } else {
          //   this.$message('发布内容成功')
          // }
          // draft ? this.$message('存为草稿成功') : this.$message('修改成功')
          this.$message({
            message: `${draft ? '存为草稿' : '修改'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          // if (draft) {
          //   this.$message('存为草稿成功')
          // } else {
          //   this.$message('发布内容成功')
          // }
          // draft ? this.$message('存为草稿成功') : this.$message('发布内容成功')
          this.$message({
            message: draft ? '存为草稿成功' : '发布内容成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    getChannels () {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    },
    getArticleInfo () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style>

</style>
