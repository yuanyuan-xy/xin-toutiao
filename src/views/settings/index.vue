<template>
  <div class="settingsIndex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      </div>
      <el-col :span="12">
        <el-form
        ref="form"
        :model="user"
        label-width="80px"
        :rules="settingsRules"
        >
          <el-form-item label="编号">
            {{user.id}}
          </el-form-item>
          <el-form-item label="手机">
            {{user.mobile}}
          </el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col
      :span="12"
      style="text-align:center"
      >
        <label for="file">
          <el-avatar
          shape="square"
          :size="180"
          fit="cover"
          :src="user.photo"
          ></el-avatar>
          <p>修改头像</p>
        </label>
        <input
        type="file"
        id="file"
        ref="file"
        hidden
        @change="onFileChange"
        >
      </el-col>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      >
      <img :src="previewImage" alt="" width="300">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'settingsIndex',
  data () {
    return {
      // 表单验证规则
      settingsRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      user: {},
      previewImage: '',
      dialogVisible: false
    }
  },
  created () {
    this.uploadUser()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onFileChange () {
      console.log(this.$refs.file.files[0])
      // 得到文件域选择的图片
      const file = this.$refs.file
      // 将文件域选择的图片转码
      const blodUrl = window.URL.createObjectURL(file.files[0])
      // 转码后的格式赋值给图片的url
      this.previewImage = blodUrl
      // 打开弹出层
      this.dialogVisible = true
      // 避免连续选择同一张图片不触发
      file.value = ''
    },
    uploadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style>

</style>
