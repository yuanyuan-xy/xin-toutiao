<template>
  <div class="fansPort">
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'fansPort',
  mounted () {
    var myChart = echarts.init(this.$refs.main)
    var option = {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [{
        type: 'bar',
        data: [10, 52, 200, 334, 390, 330, 220]
      }]
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped lang="less">
.main {
  width: 800px;
  height: 600px;
}
</style>
