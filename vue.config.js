module.exports = {
  assetsDir: 'assets',
  baseUrl: undefined,
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
}
