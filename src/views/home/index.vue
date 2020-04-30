<template>
  <div class="home">
    <img src="./word.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style scoped lang="less">
.home{
    background: url(./MySelf.jpg) no-repeat;
    background-size: cover;
    background-position: 0 -320px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
img {
  width: 800px;
  position: absolute;
  left: -330px;
}
</style>
