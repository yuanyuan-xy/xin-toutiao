<template>
  <el-container class="container">
  <el-aside width="200px" class="aside">
      <layout-aside class="layout-aside"></layout-aside>
  </el-aside>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-main class="main">
        <!-- 子路由出口 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import LayoutAside from '@/views/layout/components/aside'
export default {
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
}
.main {
    background-color: red;
}
.layout-aside {
    height: 100%;
}
</style>
