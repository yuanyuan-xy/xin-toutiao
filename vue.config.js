module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      echarts: 'echarts',
      'element-tiptap': 'tiptap',
      cropperjs: 'cropper'
    }
  }
}
