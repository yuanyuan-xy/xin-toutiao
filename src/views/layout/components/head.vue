<template>
  <div class="layout-head">
      <div>
          <span class="el-icon-s-fold"></span>
          <span>欢迎来到阳光养猪场</span>
      </div>
      <el-dropdown>
        <div class="select">
            <img class="user-avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      getUserProfile().then(res => {
        // TODO:成功
        this.user = res.data.data
      }).catch(err => {
        // TODO:失败
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-head {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align:middle
}
</style>
