<template>
  <div class="fansIndex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 主要内容 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <fans-list></fans-list>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">粉丝画像</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入粉丝列表组件
import fansList from './comments/fansList'
export default {
  name: 'fansIndex',
  comments: { fansList }
}
</script>

<style>

</style>
