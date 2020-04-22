<template>
  <el-container class="container">
  <el-aside width="200px" class="aside">
      <layout-aside class="layout-aside"></layout-aside>
  </el-aside>
  <el-container>
    <el-header class="header">
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
    </el-header>
    <el-main class="main">
        <!-- 子路由出口 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// 导入获取用户信息的接口
import { getUserProfile } from '@/api/user'
// 导入侧边栏的组件
import LayoutAside from '@/views/layout/components/aside'
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
  },
  components: {
    LayoutAside
  }
}
</script>

<style scoped lang="less">
.container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.aside {
    background-color: blue;
}
.header {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
}
.layout-aside {
    height: 100%;
}
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
