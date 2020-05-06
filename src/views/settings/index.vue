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
        ref="settings-form"
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
            <el-button
            type="primary"
            @click="onUpdateUserInfo"
            :loading="userInfoLoading"
            >保存设置</el-button>
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
      @opened="omImageOpend"
      >
      <div class="imgContainer">
        <img
        :src="previewImage"
        class="previewImage"
        ref="image"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
        type="primary"
        @click="updateUserPhoto"
        :loading="photoLoading"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入全局事件通信
import globalBus from '@/utils/global-bus'
// 导入裁剪图片的插件
// import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
// 导入跟新头像的接口
import { getUserProfile, updatePhoto, updateUserInfo } from '@/api/user'
export default {
  name: 'settingsIndex',
  data () {
    return {
      // 表单验证规则
      settingsRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      user: {
        email: '',
        id: null,
        mobile: '',
        name: '',
        intro: '',
        photo: ''
      },
      previewImage: '',
      dialogVisible: false,
      cropper: '',
      photoLoading: false, // 裁剪头像的loading
      userInfoLoading: false
    }
  },
  created () {
    this.uploadUser()
  },
  methods: {
    onFileChange () {
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
    },
    omImageOpend () {
      const image = this.$refs.image
      // 解决关闭图片时再选择还是会显示前一张图片的问题
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      // 实例化cropper对象
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false
        // 移动裁切器的时候调用
        // crop (event) {}
      })
    },
    updateUserPhoto () {
      this.photoLoading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updatePhoto(fd).then(res => {
          this.photoLoading = false
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
          // 组件间传值,通过发起事件通信
          globalBus.$emit('user-info', this.user)
        })
      })
    },
    onUpdateUserInfo () {
      this.$refs['settings-form'].validate((valid) => {
        if (valid) {
          this.userInfoLoading = true
          const { name, intro, email } = this.user
          updateUserInfo({ name, intro, email }).then(res => {
            // 组件间传值,通过发起事件通信
            globalBus.$emit('user-info', this.user)
            this.userInfoLoading = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.previewImage {
  display: block;
  width: 100%;
  max-height: 200px;
}

</style>
