<template>
  <div class="imageIndex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-btn">
        <el-radio-group
        size="mini"
        v-model="collect"
        @change="onCollectChange"
        >
          <el-radio-button
          :label="false"
          >全部</el-radio-button>
          <el-radio-button
          :label="true"
          >收藏</el-radio-button>
        </el-radio-group>
        <el-button
        type="success"
        size="mini"
        @click="dialogVisible = true"
        >上传素材</el-button>
      </div>
      <el-row :gutter="10"
        v-loading="isLoading">
        <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        :xl="4"
        v-for="item in images"
        :key="item.id"
        >
          <div class="star-col">
            <el-image
            class="star-image"
            :src="item.url"
            fit="cover"
            >
            </el-image>
            <div class="star-handle">
              <!-- 收藏按钮 -->
              <el-tooltip
              class="item"
              effect="dark"
              :content="item.is_collected ? '取消收藏' : '添加收藏'"
              placement="top-start">
                <i
                class="iconfont iconstar"
                :class="{isStar:item.is_collected}"
                @click="onStarImage(item.id,item.is_collected)"
                ></i>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="删除此素材"
                placement="top-start">
                    <i
                    class="iconfont icondel"
                    @click="del(item.id)"
                    ></i>
                </el-tooltip>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 弹出层 -->
      <el-dialog
        title="上传素材"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :append-to-body="true"
        >
        <el-upload
          class="upload-demo"
          drag
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="uploadheaders"
          :show-file-list="true"
          :on-success="onUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size.sync="pageSize"
        @current-change="currentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入获取图片素材的接口
import { getImages, delImages, starImages } from '@/api/image'
export default {
  name: 'imageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 全部or收藏
      images: [], // 图片列表
      dialogVisible: false, // 弹出框
      uploadheaders: { // 响应头
        Authorization: `Bearer ${user.token}`
      },
      total: 0, // 总页数
      page: 1, // 当前页
      pageSize: 12, // 每页的数量
      isLoading: true // 是否加载
    }
  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect = false) {
      this.isLoading = true
      getImages({
        collect,
        page: this.page,
        per_page: this.pageSize
      }).then(res => {
        this.isLoading = false
        this.total = res.data.data.total_count
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.page = 1
      this.loadImages(value)
    },
    // 弹出框
    handleClose (done) {
      done()
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogVisible = false
      // 刷新页面
      this.loadImages(false)
    },
    // 删除
    del (id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delImages(id).then(res => {
          this.loadImages(false)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 改变页码
    currentChange (page) {
      this.page = page
      this.loadImages(false)
    },
    // 收藏与取消收藏资源
    onStarImage (id, isStar) {
      starImages(
        id,
        !isStar
      ).then(res => {
        // if (this.collect) {
        //   this.collect = true
        //   this.loadImages(true)
        // } else {
        //   this.collect = false
        //   this.loadImages(false)
        // }
        this.loadImages(this.collect)
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-btn {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
// 整个盒子得样式
.star-col {
  width: 200px;
  position: relative;
  margin-bottom: 10px;
}
.star-col:hover .star-handle {
  height: 30px;
}
// 图片的样式
.star-image {
  height: 200px;
}
// 装图标的盒子得样式
.star-handle {
  position: absolute;
  bottom: 2px;
  width: 100%;
  height: 0px;
  background-color: rgba(255,255,255,.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  transition: all .5s;
}
// 是否是收藏的样式
.isStar {
  color:red
}
</style>
