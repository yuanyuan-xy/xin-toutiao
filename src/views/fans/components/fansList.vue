<template>
  <div class="fansList">
    <el-row :gutter="10">
      <el-col
      :xs="12"
      :sm="6"
      :md="4"
      :lg="3"
      :xl="1"
      v-for="(item, index) in fans"
      :key="index"
      >
      <div class="theFan">
        <img :src="item.photo" class="fansAva">
        <p class="fansName">{{item.name}}</p>
        <div class="btn"><el-button type="success" plain>+关注</el-button></div>
      </div>
      </el-col>
    </el-row>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page.sync="currentPage"
      :page-sizes="[20, 30, 40, 50]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { getFans } from '@/api/fans'
export default {
  name: 'fansListIndex',
  data () {
    return {
      fans: {
        id: null,
        name: '',
        photo: ''
      },
      currentPage: 1, // 当前页
      pageSize: 20, // 每页几条
      totalCount: 0 // 总数
    }
  },
  created () {
    this.onFans(1)
  },
  methods: {
    onFans (page) {
      getFans({
        page,
        per_page: this.pageSize
      }).then(res => {
        this.fans = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.onFans(1)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onFans(val)
    }
  }
}
</script>

<style scoped lang="less">
.theFan {
  position: relative;
  text-align: center;
  width: 100px;
  height: 170px;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px dotted #000;
  overflow: hidden;
  transition: all .5s;
  background-color: #909eff;
  .fansAva {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transition: all .5s;
  }
  .btn {
    position: absolute;
    top: 160px;
    left: -141px;
    width: 100%;
    transition: all .5s;
  }
  .fansName {
    position: absolute;
    top: 90px;
    right: -141px;
    width: 100%;
    margin: 25px 0;
    transition: all .5s;
  }
}
.theFan:hover {
  background-color: #fbc531;
}
.theFan:hover .fansAva {
  width: 70px;
  height: 70px;
  top: 30px;
}
.theFan:hover .btn {
  left: 0px;
}
.theFan:hover .fansName {
  right: 0px;
}
</style>
