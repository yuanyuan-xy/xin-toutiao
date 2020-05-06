<template>
  <div class="uploadCover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img
      :src="value"
      class="cover-image"
      ref="previewImage"
      alt=""
      >
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="收藏封面" name="first">
          <image-list
          :is-show-add="false"
          :is-show-active="false"
          ref="image-list"
          ></image-list>
        </el-tab-pane>
        <el-tab-pane label="上传" name="second">
          <input
          ref="file"
          type="file"
          @change="onFileChange"
          >
          <img
          width="100"
          ref="preview-image"
          >
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入收藏的封面的组件
import ImageList from '@/views/image/components/image-list'
// 引入接口
import { uploadImage } from '@/api/image'
export default {
  // 通过v-model将父组件的images这个数组传了过来
  props: ['value'],
  components: {
    ImageList
  },
  name: 'uploadCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      previewImage: ''
    }
  },
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file
      const blob = window.URL.createObjectURL(file.files[0])
      this.$refs['preview-image'].src = blob
    },
    async onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择图片')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        const res = await uploadImage(fd)
        // 关闭弹出层
        this.dialogVisible = false
        // 将图片地址发送给父组件
        this.$emit('input', res.data.data.url)
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择图片')
          return
        }
        // 关闭弹出层
        this.dialogVisible = false
        // imageList.images[selected].url 的意思是 素材组件的图片数据里的第几个的url发送给父组件
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .uploadCover {
    width: 200px;
    height: 200px;
  }
  .cover-wrap {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    .cover-image {
      width: 100%;
      max-height: 200px;
    }
  }
</style>
