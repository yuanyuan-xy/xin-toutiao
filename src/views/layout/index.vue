<template>
  <el-container class="container">
  <el-aside width="200px" class="aside">
      <layout-aside class="layout-aside"></layout-aside>
  </el-aside>
  <el-container>
    <el-header class="header">
        <layout-head></layout-head>
    </el-header>
    <el-main class="main">
        <!-- 子路由出口 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// 导入侧边栏的组件
import LayoutAside from '@/views/layout/components/aside'
// 导入头部的组件
import LayoutHead from '@/views/layout/components/head'
export default {
  components: {
    LayoutAside,
    LayoutHead
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
</style>
