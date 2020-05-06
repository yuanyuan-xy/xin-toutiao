<template>
  <el-container class="container">
  <el-aside width="auto" class="aside">
      <layout-aside class="layout-aside" :isCollapse="isCollapse"></layout-aside>
  </el-aside>
  <el-container>
    <el-header class="header">
        <div class="layout-head">
      <div>
          <span
          :class="{'el-icon-s-fold': isCollapse, 'el-icon-s-unfold': !isCollapse}"
          @click="isCollapse = !isCollapse"
          ></span>
          <span>欢迎来到阳光养猪场</span>
      </div>
      <el-dropdown>
        <div class="select">
            <img class="user-avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="onSettings">设置</el-dropdown-item>
            <!-- 组件里的事件是不识别的,会渲染成子组件向父组件传值,得加.native修饰符 -->
            <el-dropdown-item
            @click.native="onLogout"
            >退出</el-dropdown-item>
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
// 导入全局事件通信
import globalBus from '@/utils/global-bus'
// 导入获取用户信息的接口
import { getUserProfile } from '@/api/user'
// 导入侧边栏的组件
import LayoutAside from '@/views/layout/components/aside'
export default {
  data () {
    return {
      user: {},
      isCollapse: true
    }
  },
  created () {
    this.getProfile()
    // 全局事件通信,注册事件接收传过来的值
    globalBus.$on('user-info', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    async getProfile () {
      const res = await getUserProfile()
      // TODO:成功
      this.user = res.data.data
    },
    onLogout () {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    onSettings () {
      this.$router.push('/settings')
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
.main {
  position: relative;
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
