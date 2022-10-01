const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  assetsDir: 'static',
  outputDir: '../backend/dist'
};
// module.exports = {
//   devServer: {
//       // localhostでvueからexpressにAPIリクエストを送信する為の設定
//       proxy: 'http://localhost:8000'
//   },
// }