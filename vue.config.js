module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/lolre/' : '/',

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/scss/_Config.scss";`
      }
    }
  }
}
