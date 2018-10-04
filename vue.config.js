module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => Object.assign(options, {
          transformAssetUrls: {"b-img": 'src',"b-card": 'img-src'}
        }));
  }
}
