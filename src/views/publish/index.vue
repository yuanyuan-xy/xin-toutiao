<template>
  <div class="publish">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form
        ref="publish-form"
        :model="article"
        label-width="60px"
        :rules="publishRules"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-tiptap
            :extensions="extensions"
            v-model="article.content"
            height="350"
            ></el-tiptap>
          </el-form-item>
           <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <template v-if="article.cover.type > 0">
              <upload-cover
              v-for="(i, index) in article.cover.type"
              :key="i"
              class="cover-container"
              v-model="article.cover.images[index]"
              ></upload-cover>
            </template>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
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
// 引入选择封面的组件
import UploadCover from './components/upload-cover'
// 引入接口
import {
  getArticleChannels,
  addArticle,
  getArticle,
  editArticle
} from '@/api/article.js'
import { uploadImage } from '@/api/image.js'
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
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  data () {
    return {
      channels: [], // 文章频道列表
      article: { // 提交的数据
        title: '',
        content: '',
        cover: {
          type: 1,
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
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          }
        })
      ],
      // 验证规则
      publishRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator: (rule, value, callback) => {
              if (value === '<p></p>') {
                callback(new Error('内容不能为空'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }
        ]
      }
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
      // 验证表单是否通过
      this.$refs['publish-form'].validate((valid) => {
        // 如果表单验证失败,就停止执行
        if (!valid) {
          return
        }
        // 如果表单验证成功,就执行下面的
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
      })
    },
    getChannels () {
      getArticleChannels().then(res => {
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

<style scoped lang="less">
</style>
